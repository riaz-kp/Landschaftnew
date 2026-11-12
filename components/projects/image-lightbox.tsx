"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import {
    ChevronLeft,
    ChevronRight,
    Maximize,
    Minimize,
    Pause,
    Play,
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
const SLIDE_INTERVAL = 4000

type Point = { x: number; y: number }
type Direction = 1 | -1

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
    title,
    children,
}: {
    images: LightboxImage[]
    title?: string
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
                    title={title}
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
    title,
    open,
    onOpenChange,
    index,
    onIndexChange,
}: {
    images: LightboxImage[]
    title?: string
    open: boolean
    onOpenChange: (open: boolean) => void
    index: number
    onIndexChange: (index: number) => void
}) {
    const count = images.length
    const current = images[index] ?? images[0]

    const [scale, setScale] = React.useState(1)
    const [offset, setOffset] = React.useState<Point>({ x: 0, y: 0 })
    const [gesturing, setGesturing] = React.useState(false)
    const [loaded, setLoaded] = React.useState(false)
    const [transition, setTransition] = React.useState<Direction | null>(null)
    const [playing, setPlaying] = React.useState(false)
    const [canFullscreen, setCanFullscreen] = React.useState(false)
    const [isFullscreen, setIsFullscreen] = React.useState(false)

    const [stage, setStage] = React.useState<HTMLDivElement | null>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)
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

    const zoomed = scale > MIN_SCALE

    const resetZoom = React.useCallback(() => {
        setScale(1)
        setOffset({ x: 0, y: 0 })
    }, [])

    /** Switch slides, resetting zoom up front so the new image never inherits the old transform. */
    const show = React.useCallback(
        (next: number, direction: Direction) => {
            if (next === index) return
            resetZoom()
            setLoaded(false)
            setTransition(direction)
            onIndexChange(next)
        },
        [index, onIndexChange, resetZoom]
    )

    const go = React.useCallback(
        (delta: number) => {
            if (count < 2) return
            show((index + delta + count) % count, delta > 0 ? 1 : -1)
        },
        [count, index, show]
    )

    const close = React.useCallback(() => {
        setPlaying(false)
        if (document.fullscreenElement) void document.exitFullscreen().catch(() => {})
        onOpenChange(false)
    }, [onOpenChange])

    const handleOpenChange = React.useCallback(
        (next: boolean) => (next ? onOpenChange(true) : close()),
        [close, onOpenChange]
    )

    const toggleFullscreen = React.useCallback(() => {
        if (document.fullscreenElement) {
            void document.exitFullscreen().catch(() => {})
        } else {
            void contentRef.current?.requestFullscreen?.().catch(() => {})
        }
    }, [])

    // Fullscreen support differs per browser (e.g. not available on iPhone), so detect it.
    React.useEffect(() => {
        setCanFullscreen(Boolean(document.fullscreenEnabled))
        const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
        document.addEventListener("fullscreenchange", onChange)
        return () => document.removeEventListener("fullscreenchange", onChange)
    }, [])

    // Fresh state each time the viewer opens.
    React.useEffect(() => {
        if (!open) return
        resetZoom()
        setLoaded(false)
        setTransition(null)
    }, [open, resetZoom])

    // Image may already be cached, in which case onLoad can fire before React attaches it.
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

    // Autoplay: advance once the current image has loaded; pauses while zoomed in.
    React.useEffect(() => {
        if (!open || !playing || zoomed || !loaded || count < 2) return
        const t = window.setTimeout(() => go(1), SLIDE_INTERVAL)
        return () => window.clearTimeout(t)
    }, [open, playing, zoomed, loaded, count, go])

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
            close()
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
        // Let buttons handle their own Enter/Space.
        const onButton = (e.target as HTMLElement).closest("button") !== null
        switch (e.key) {
            case "ArrowRight":
                e.preventDefault()
                go(1)
                break
            case "ArrowLeft":
                e.preventDefault()
                go(-1)
                break
            case "Home":
                e.preventDefault()
                show(0, -1)
                break
            case "End":
                e.preventDefault()
                show(count - 1, 1)
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
            case "f":
            case "F":
                if (!canFullscreen) break
                e.preventDefault()
                toggleFullscreen()
                break
            case " ":
                if (onButton || count < 2) break
                e.preventDefault()
                setPlaying((p) => !p)
                break
        }
    }

    const showProgress = playing && loaded && !zoomed && count > 1

    return (
        <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-neutral-950/[0.97] backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
                <DialogPrimitive.Content
                    ref={contentRef}
                    tabIndex={-1}
                    onKeyDown={onKeyDown}
                    onOpenAutoFocus={(e) => {
                        // Focus the viewer itself so arrow keys work without a focus ring on a button.
                        e.preventDefault()
                        contentRef.current?.focus()
                    }}
                    onEscapeKeyDown={(e) => {
                        // First Esc leaves fullscreen, the next one closes.
                        if (document.fullscreenElement) {
                            e.preventDefault()
                            void document.exitFullscreen().catch(() => {})
                        }
                    }}
                    aria-describedby={undefined}
                    className="fixed inset-0 z-50 flex flex-col text-white outline-none [&:fullscreen]:bg-neutral-950 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
                >
                    <DialogPrimitive.Title className="sr-only">
                        {title ? `${title} – ` : ""}
                        {current.alt}
                    </DialogPrimitive.Title>

                    {/* Top bar */}
                    <div className="relative z-20 flex items-center gap-3 px-3 pb-2 pt-3 sm:px-6 sm:pt-5">
                        <div className="min-w-0 flex-1">
                            {title && (
                                <p className="truncate text-sm font-medium tracking-wide text-white sm:text-base">
                                    {title}
                                </p>
                            )}
                            <p
                                className="text-xs tabular-nums tracking-wider text-white/60"
                                aria-live="polite"
                            >
                                {String(index + 1).padStart(2, "0")}
                                <span className="mx-1 text-white/30">/</span>
                                {String(count).padStart(2, "0")}
                            </p>
                        </div>

                        <div className="flex items-center rounded-full border border-white/15 bg-white/10 p-1 shadow-lg shadow-black/30 backdrop-blur-md">
                            <ToolbarButton
                                label="Zoom out (−)"
                                onClick={() => zoomTo(scale - ZOOM_STEP)}
                                disabled={!zoomed}
                            >
                                <ZoomOut className="h-5 w-5" />
                            </ToolbarButton>
                            <button
                                type="button"
                                onClick={resetZoom}
                                title="Reset zoom (0)"
                                aria-label={`Zoom ${Math.round(scale * 100)}%, reset zoom`}
                                className={cn(
                                    "hidden h-9 min-w-[3.5rem] items-center justify-center rounded-full px-2 text-xs font-medium tabular-nums text-white/85 transition sm:inline-flex sm:h-10",
                                    zoomed ? "cursor-pointer hover:bg-white/15 hover:text-white" : "cursor-default"
                                )}
                            >
                                {Math.round(scale * 100)}%
                            </button>
                            <ToolbarButton
                                label="Zoom in (+)"
                                onClick={() => zoomTo(scale + ZOOM_STEP)}
                                disabled={scale >= MAX_SCALE}
                            >
                                <ZoomIn className="h-5 w-5" />
                            </ToolbarButton>

                            {(count > 1 || canFullscreen) && (
                                <span className="mx-1 h-5 w-px bg-white/20" aria-hidden />
                            )}

                            {count > 1 && (
                                <ToolbarButton
                                    label={playing ? "Pause slideshow (Space)" : "Play slideshow (Space)"}
                                    onClick={() => setPlaying((p) => !p)}
                                    aria-pressed={playing}
                                >
                                    {playing ? (
                                        <Pause className="h-5 w-5" fill="currentColor" />
                                    ) : (
                                        <Play className="h-5 w-5" fill="currentColor" />
                                    )}
                                </ToolbarButton>
                            )}
                            {canFullscreen && (
                                <ToolbarButton
                                    label={isFullscreen ? "Exit fullscreen (F)" : "Fullscreen (F)"}
                                    onClick={toggleFullscreen}
                                    aria-pressed={isFullscreen}
                                >
                                    {isFullscreen ? (
                                        <Minimize className="h-5 w-5" />
                                    ) : (
                                        <Maximize className="h-5 w-5" />
                                    )}
                                </ToolbarButton>
                            )}
                        </div>

                        <DialogPrimitive.Close asChild>
                            <ToolbarButton
                                label="Close (Esc)"
                                className="h-11 w-11 border border-white/15 bg-white/10 shadow-lg shadow-black/30 backdrop-blur-md sm:h-12 sm:w-12"
                            >
                                <X className="h-5 w-5 sm:h-6 sm:w-6" />
                            </ToolbarButton>
                        </DialogPrimitive.Close>
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
                        {showProgress && (
                            <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-white/10" aria-hidden>
                                <div
                                    key={index}
                                    className="h-full origin-left bg-white/80"
                                    style={{
                                        animation: `lightbox-progress ${SLIDE_INTERVAL}ms linear forwards`,
                                    }}
                                />
                            </div>
                        )}

                        {!loaded && (
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/15 border-t-white/80" />
                            </div>
                        )}

                        <div
                            key={current.src}
                            className={cn(
                                "absolute inset-0 flex items-center justify-center p-2 sm:px-24 sm:py-4",
                                loaded && transition && "animate-in fade-in-0 duration-300 ease-out",
                                loaded && transition === 1 && "slide-in-from-right-12",
                                loaded && transition === -1 && "slide-in-from-left-12"
                            )}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                ref={imgRef}
                                src={current.src}
                                alt={current.alt}
                                draggable={false}
                                onLoad={() => setLoaded(true)}
                                className={cn(
                                    "max-h-full max-w-full rounded-sm object-contain shadow-2xl shadow-black/50 will-change-transform",
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
                                <NavButton side="left" label="Previous image (←)" onClick={() => go(-1)}>
                                    <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
                                </NavButton>
                                <NavButton side="right" label="Next image (→)" onClick={() => go(1)}>
                                    <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
                                </NavButton>
                            </>
                        )}
                    </div>

                    {/* Bottom: hint + thumbnails */}
                    <div className="relative z-20 flex flex-col items-center gap-2 pb-3 pt-2 sm:gap-3 sm:pb-5">
                        <p className="px-4 text-center text-[11px] tracking-wide text-white/50 sm:text-xs">
                            <span className="pointer-coarse:hidden">
                                {zoomed
                                    ? "Drag to look around · Click to zoom out"
                                    : "Click or scroll to zoom · Use ← → to browse"}
                            </span>
                            <span className="hidden pointer-coarse:inline">
                                {zoomed
                                    ? "Drag to look around · Double-tap to zoom out"
                                    : "Pinch or double-tap to zoom · Swipe to browse"}
                            </span>
                        </p>

                        {count > 1 && (
                            <div
                                ref={thumbsRef}
                                className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            >
                                <div className="mx-auto flex w-max gap-2 px-4 py-1.5 sm:gap-3">
                                    {images.map((img, i) => {
                                        const active = i === index
                                        return (
                                            <button
                                                key={img.src}
                                                type="button"
                                                data-index={i}
                                                onClick={() => show(i, i > index ? 1 : -1)}
                                                aria-label={`Show image ${i + 1} of ${count}`}
                                                aria-current={active}
                                                title={`Image ${i + 1}`}
                                                className={cn(
                                                    "relative h-12 w-16 shrink-0 cursor-pointer overflow-hidden rounded-md transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:h-14 sm:w-20",
                                                    active
                                                        ? "opacity-100 ring-2 ring-white ring-offset-2 ring-offset-neutral-950"
                                                        : "opacity-45 hover:-translate-y-0.5 hover:opacity-100"
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
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
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
            "inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition sm:h-10 sm:w-10",
            "enabled:hover:bg-white/20 enabled:active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
            "disabled:cursor-not-allowed disabled:text-white/35",
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
                "absolute top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/35 text-white shadow-lg shadow-black/30 backdrop-blur-md transition sm:h-14 sm:w-14",
                "hover:scale-105 hover:bg-white/20 active:scale-95",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                side === "left" ? "left-2 sm:left-6" : "right-2 sm:right-6"
            )}
        >
            {children}
        </button>
    )
}
