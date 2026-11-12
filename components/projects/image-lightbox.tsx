"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    X,
    ZoomIn,
    ZoomOut,
} from "lucide-react"

import { cn } from "@/lib/utils"

export interface LightboxImage {
    src: string
    alt: string
}

interface LightboxContextValue {
    openAt: (src: string) => void
}

const LightboxContext = React.createContext<LightboxContextValue | null>(null)

const MIN_SCALE = 1
const MAX_SCALE = 5
const ZOOM_STEP = 0.5
const DOUBLE_TAP_SCALE = 2.5
const SWIPE_THRESHOLD = 60

type Point = { x: number; y: number }

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max)

/** Smaller Cloudinary rendition for the thumbnail strip; other URLs pass through. */
function thumbnailSrc(src: string) {
    const marker = "/image/upload/"
    if (!src.includes("res.cloudinary.com") || !src.includes(marker)) return src
    return src.replace(marker, `${marker}w_240,h_160,c_fill,q_auto,f_auto/`)
}

export function ImageLightboxProvider({
    images,
    children,
}: {
    images: LightboxImage[]
    children: React.ReactNode
}) {
    const [open, setOpen] = React.useState(false)
    const [index, setIndex] = React.useState(0)

    const openAt = React.useCallback(
        (src: string) => {
            const i = images.findIndex((img) => img.src === src)
            setIndex(i === -1 ? 0 : i)
            setOpen(true)
        },
        [images]
    )

    const value = React.useMemo(() => ({ openAt }), [openAt])

    return (
        <LightboxContext.Provider value={value}>
            {children}
            {images.length > 0 && (
                <Lightbox
                    images={images}
                    open={open}
                    onOpenChange={setOpen}
                    index={index}
                    onIndexChange={setIndex}
                />
            )}
        </LightboxContext.Provider>
    )
}

export function ImageLightboxTrigger({
    src,
    label,
    className,
    children,
}: {
    src: string
    label: string
    className?: string
    children: React.ReactNode
}) {
    const ctx = React.useContext(LightboxContext)
    return (
        <button
            type="button"
            aria-label={label}
            onClick={() => ctx?.openAt(src)}
            className={cn(
                "block cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
        >
            {children}
        </button>
    )
}

function Lightbox({
    images,
    open,
    onOpenChange,
    index,
    onIndexChange,
}: {
    images: LightboxImage[]
    open: boolean
    onOpenChange: (open: boolean) => void
    index: number
    onIndexChange: (index: number) => void
}) {
    const count = images.length
    const current = images[index]

    const [scale, setScale] = React.useState(1)
    const [offset, setOffset] = React.useState<Point>({ x: 0, y: 0 })
    const [gesturing, setGesturing] = React.useState(false)
    const [loaded, setLoaded] = React.useState(false)

    const [stage, setStage] = React.useState<HTMLDivElement | null>(null)
    const imgRef = React.useRef<HTMLImageElement>(null)
    const thumbsRef = React.useRef<HTMLDivElement>(null)

    // Latest transform values, readable from native listeners without re-binding.
    const view = React.useRef({ scale: 1, offset: { x: 0, y: 0 } })
    view.current = { scale, offset }

    const pointers = React.useRef(new Map<number, Point>())
    const gesture = React.useRef<{
        start: Point
        startOffset: Point
        startScale: number
        startDistance: number
        startTime: number
        moved: boolean
    } | null>(null)
    const lastTap = React.useRef<{ time: number; point: Point } | null>(null)
    const downOnImage = React.useRef(false)

    const resetZoom = React.useCallback(() => {
        setScale(1)
        setOffset({ x: 0, y: 0 })
    }, [])

    const go = React.useCallback(
        (delta: number) => {
            if (count < 2) return
            onIndexChange((index + delta + count) % count)
        },
        [count, index, onIndexChange]
    )

    // New slide (or reopened): reset zoom and loading state.
    React.useEffect(() => {
        resetZoom()
        setLoaded(false)
    }, [index, open, resetZoom])

    // Image may already be cached, in which case onLoad can fire before hydration.
    React.useEffect(() => {
        if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) setLoaded(true)
    }, [index, open])

    // Warm the cache for neighbours so next/previous feel instant.
    React.useEffect(() => {
        if (!open || count < 2) return
        for (const d of [1, -1]) {
            const img = new window.Image()
            img.src = images[(index + d + count) % count].src
        }
    }, [open, index, count, images])

    // Keep the active thumbnail in view.
    React.useEffect(() => {
        if (!open) return
        const el = thumbsRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)
        el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
    }, [open, index])

    /** Keep the image from being dragged past its edges. */
    const clampOffset = React.useCallback(
        (next: Point, s: number): Point => {
            const img = imgRef.current
            if (!img || !stage) return next
            const maxX = Math.max(0, (img.offsetWidth * s - stage.clientWidth) / 2)
            const maxY = Math.max(0, (img.offsetHeight * s - stage.clientHeight) / 2)
            return { x: clamp(next.x, -maxX, maxX), y: clamp(next.y, -maxY, maxY) }
        },
        [stage]
    )

    /** Zoom to `nextScale`, keeping the stage point `focus` (relative to the stage centre) fixed. */
    const zoomTo = React.useCallback(
        (nextScale: number, focus: Point = { x: 0, y: 0 }, from = view.current) => {
            const s = clamp(nextScale, MIN_SCALE, MAX_SCALE)
            if (s === MIN_SCALE) {
                resetZoom()
                return
            }
            const ratio = s / from.scale
            const next = {
                x: focus.x - ratio * (focus.x - from.offset.x),
                y: focus.y - ratio * (focus.y - from.offset.y),
            }
            setScale(s)
            setOffset(clampOffset(next, s))
        },
        [clampOffset, resetZoom]
    )

    const stagePoint = React.useCallback(
        (clientX: number, clientY: number): Point => {
            if (!stage) return { x: 0, y: 0 }
            const rect = stage.getBoundingClientRect()
            return {
                x: clientX - rect.left - rect.width / 2,
                y: clientY - rect.top - rect.height / 2,
            }
        },
        [stage]
    )

    // Wheel / trackpad zoom. Needs a non-passive listener to stop the page from scrolling.
    React.useEffect(() => {
        if (!stage) return
        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0025))
            zoomTo(view.current.scale * factor, stagePoint(e.clientX, e.clientY))
        }
        stage.addEventListener("wheel", onWheel, { passive: false })
        return () => stage.removeEventListener("wheel", onWheel)
    }, [stage, zoomTo, stagePoint])

    const beginGesture = () => {
        const pts = [...pointers.current.values()]
        const start =
            pts.length >= 2
                ? { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 }
                : pts[0]
        gesture.current = {
            start,
            startOffset: view.current.offset,
            startScale: view.current.scale,
            startDistance:
                pts.length >= 2 ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0,
            startTime: performance.now(),
            moved: gesture.current?.moved ?? false,
        }
    }

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === "mouse" && e.button !== 0) return
        // Clicks on the controls shouldn't start a drag.
        if ((e.target as HTMLElement).closest("button")) return
        e.currentTarget.setPointerCapture(e.pointerId)
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
        if (pointers.current.size === 1) {
            gesture.current = null
            downOnImage.current = e.target === imgRef.current
        }
        beginGesture()
        setGesturing(true)
    }

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!pointers.current.has(e.pointerId) || !gesture.current) return
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
        const g = gesture.current
        const pts = [...pointers.current.values()]

        if (pts.length >= 2) {
            // Pinch zoom around the midpoint between the two fingers.
            const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 }
            const distance = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
            g.moved = true
            const startMid = stagePoint(g.start.x, g.start.y)
            const nowMid = stagePoint(mid.x, mid.y)
            const s = clamp(g.startScale * (distance / g.startDistance), MIN_SCALE, MAX_SCALE)
            const ratio = s / g.startScale
            const next = {
                x: nowMid.x - ratio * (startMid.x - g.startOffset.x),
                y: nowMid.y - ratio * (startMid.y - g.startOffset.y),
            }
            setScale(s)
            setOffset(s === MIN_SCALE ? { x: 0, y: 0 } : clampOffset(next, s))
            return
        }

        const dx = e.clientX - g.start.x
        const dy = e.clientY - g.start.y
        if (Math.hypot(dx, dy) > 6) g.moved = true

        if (view.current.scale > MIN_SCALE) {
            setOffset(
                clampOffset(
                    { x: g.startOffset.x + dx, y: g.startOffset.y + dy },
                    view.current.scale
                )
            )
        } else if (count > 1) {
            // Not zoomed: let the image follow the pointer horizontally as a swipe preview.
            setOffset({ x: dx, y: 0 })
        }
    }

    const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
        pointers.current.delete(e.pointerId)
        if (pointers.current.size > 0) return
        gesture.current = null
        setGesturing(false)
        if (view.current.scale <= MIN_SCALE) setOffset({ x: 0, y: 0 })
    }

    const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!pointers.current.has(e.pointerId)) return
        pointers.current.delete(e.pointerId)
        const g = gesture.current

        if (pointers.current.size > 0) {
            // One finger lifted mid-pinch: continue as a pan from here.
            beginGesture()
            return
        }

        setGesturing(false)
        gesture.current = null
        if (!g) return

        const dx = e.clientX - g.start.x
        const elapsed = performance.now() - g.startTime

        if (view.current.scale <= MIN_SCALE) {
            if (g.moved && Math.abs(dx) > SWIPE_THRESHOLD && count > 1) {
                go(dx < 0 ? 1 : -1)
                return
            }
            setOffset({ x: 0, y: 0 })
        }

        if (g.moved) return

        const point = { x: e.clientX, y: e.clientY }
        const toggleZoom = () => {
            if (view.current.scale > MIN_SCALE) resetZoom()
            else zoomTo(DOUBLE_TAP_SCALE, stagePoint(point.x, point.y))
        }

        // A click/tap on the empty backdrop closes the viewer.
        if (!downOnImage.current && view.current.scale <= MIN_SCALE) {
            onOpenChange(false)
            return
        }

        // Mouse: single click toggles zoom at the cursor.
        if (e.pointerType === "mouse") {
            toggleZoom()
            return
        }

        // Touch / pen: double tap toggles zoom at that point.
        if (elapsed > 300) return
        const now = performance.now()
        const prev = lastTap.current
        if (
            prev &&
            now - prev.time < 300 &&
            Math.hypot(point.x - prev.point.x, point.y - prev.point.y) < 30
        ) {
            lastTap.current = null
            toggleZoom()
        } else {
            lastTap.current = { time: now, point }
        }
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case "ArrowRight":
                e.preventDefault()
                go(1)
                break
            case "ArrowLeft":
                e.preventDefault()
                go(-1)
                break
            case "+":
            case "=":
                e.preventDefault()
                zoomTo(scale + ZOOM_STEP)
                break
            case "-":
            case "_":
                e.preventDefault()
                zoomTo(scale - ZOOM_STEP)
                break
            case "0":
                e.preventDefault()
                resetZoom()
                break
        }
    }

    const zoomed = scale > MIN_SCALE

    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/[0.97] backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
                <DialogPrimitive.Content
                    onKeyDown={onKeyDown}
                    aria-describedby={undefined}
                    className="fixed inset-0 z-50 flex flex-col text-white outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
                >
                    <DialogPrimitive.Title className="sr-only">
                        {current?.alt ?? "Project image"}
                    </DialogPrimitive.Title>

                    {/* Top bar */}
                    <div className="relative z-10 flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
                        <span className="text-sm tabular-nums text-white/80" aria-live="polite">
                            {index + 1} / {count}
                        </span>
                        <div className="flex items-center gap-1">
                            <ToolbarButton
                                label="Zoom out"
                                onClick={() => zoomTo(scale - ZOOM_STEP)}
                                disabled={!zoomed}
                            >
                                <ZoomOut className="h-5 w-5" />
                            </ToolbarButton>
                            <span className="w-12 text-center text-xs tabular-nums text-white/70">
                                {Math.round(scale * 100)}%
                            </span>
                            <ToolbarButton
                                label="Zoom in"
                                onClick={() => zoomTo(scale + ZOOM_STEP)}
                                disabled={scale >= MAX_SCALE}
                            >
                                <ZoomIn className="h-5 w-5" />
                            </ToolbarButton>
                            <ToolbarButton label="Reset zoom" onClick={resetZoom} disabled={!zoomed}>
                                <Maximize2 className="h-4 w-4" />
                            </ToolbarButton>
                            <span className="mx-1 h-5 w-px bg-white/20" aria-hidden />
                            <DialogPrimitive.Close asChild>
                                <ToolbarButton label="Close">
                                    <X className="h-5 w-5" />
                                </ToolbarButton>
                            </DialogPrimitive.Close>
                        </div>
                    </div>

                    {/* Stage */}
                    <div
                        ref={setStage}
                        className={cn(
                            "relative flex-1 touch-none select-none overflow-hidden",
                            zoomed && (gesturing ? "cursor-grabbing" : "cursor-grab")
                        )}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerCancel}
                    >
                        <div className="absolute inset-0 flex items-center justify-center p-2 sm:px-20 sm:py-4">
                            {!loaded && (
                                <div
                                    className="absolute h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80"
                                    aria-hidden
                                />
                            )}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                key={current.src}
                                ref={imgRef}
                                src={current.src}
                                alt={current.alt}
                                draggable={false}
                                onLoad={() => setLoaded(true)}
                                className={cn(
                                    "max-h-full max-w-full object-contain will-change-transform",
                                    !zoomed && "cursor-zoom-in",
                                    !gesturing && "transition-transform duration-200 ease-out",
                                    loaded ? "opacity-100" : "opacity-0"
                                )}
                                style={{
                                    transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                                }}
                            />
                        </div>

                        {count > 1 && (
                            <>
                                <NavButton side="left" label="Previous image" onClick={() => go(-1)}>
                                    <ChevronLeft className="h-6 w-6" />
                                </NavButton>
                                <NavButton side="right" label="Next image" onClick={() => go(1)}>
                                    <ChevronRight className="h-6 w-6" />
                                </NavButton>
                            </>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {count > 1 && (
                        <div
                            ref={thumbsRef}
                            className="relative z-10 flex gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {images.map((img, i) => (
                                <button
                                    key={img.src}
                                    type="button"
                                    data-index={i}
                                    onClick={() => onIndexChange(i)}
                                    aria-label={`Show image ${i + 1} of ${count}`}
                                    aria-current={i === index}
                                    className={cn(
                                        "h-12 w-16 shrink-0 overflow-hidden rounded-sm border-2 transition sm:h-14 sm:w-20",
                                        i === index
                                            ? "border-white opacity-100"
                                            : "border-transparent opacity-50 hover:opacity-90"
                                    )}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={thumbnailSrc(img.src)}
                                        alt=""
                                        loading="lazy"
                                        draggable={false}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    )
}

const ToolbarButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }
>(({ label, className, children, ...props }, ref) => (
    <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:pointer-events-none disabled:opacity-30",
            className
        )}
        {...props}
    >
        {children}
    </button>
))
ToolbarButton.displayName = "ToolbarButton"

function NavButton({
    side,
    label,
    onClick,
    children,
}: {
    side: "left" | "right"
    label: string
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            onClick={onClick}
            className={cn(
                "absolute top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:h-12 sm:w-12",
                side === "left" ? "left-2 sm:left-5" : "right-2 sm:right-5"
            )}
        >
            {children}
        </button>
    )
}
