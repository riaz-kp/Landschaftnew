"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Reorder, useDragControls } from "framer-motion"
import { ArrowDown, ArrowUp, ChevronsDown, ChevronsUp, EyeOff, GripVertical, Loader2, Star } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Project } from "@/lib/data/projects"
import { reorderProjects } from "@/app/admin/actions"

interface ProjectOrderListProps {
    projects: Project[]
    onClose: () => void
}

export function ProjectOrderList({ projects, onClose }: ProjectOrderListProps) {
    const router = useRouter()
    const [items, setItems] = useState(projects)
    const [isSaving, setIsSaving] = useState(false)

    const isDirty = items.some((project, i) => project.slug !== projects[i]?.slug)

    const move = (from: number, to: number) => {
        if (to < 0 || to >= items.length || from === to) return
        setItems(prev => {
            const next = [...prev]
            const [moved] = next.splice(from, 1)
            next.splice(to, 0, moved)
            return next
        })
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await reorderProjects(items.map(p => p.slug))
            toast.success("Project order saved")
            router.refresh()
            onClose()
        } catch (error) {
            console.error("Error saving project order:", error)
            toast.error("Failed to save project order")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 p-4 rounded-3xl border border-slate-100 shadow-sm">
                <div className="px-2 space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="h-4 w-1 bg-indigo-500 rounded-full" />
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Arrange Project Order</h2>
                    </div>
                    <p className="text-sm text-slate-500 font-medium pl-4">
                        Drag by the handle or use the arrows. This order is used on the Projects page and the home page.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <Button variant="outline" onClick={onClose} disabled={isSaving} className="h-12 px-6 rounded-2xl font-bold border-slate-200">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={!isDirty || isSaving}
                        className="h-12 px-6 rounded-2xl bg-slate-900 hover:bg-black text-white shadow-lg shadow-slate-200 gap-2 font-bold"
                    >
                        {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                        Save Order
                    </Button>
                </div>
            </div>

            <Reorder.Group as="ol" axis="y" values={items} onReorder={setItems} className="space-y-3">
                {items.map((project, index) => (
                    <OrderRow
                        key={project.slug}
                        project={project}
                        index={index}
                        total={items.length}
                        disabled={isSaving}
                        onMove={move}
                    />
                ))}
            </Reorder.Group>
        </div>
    )
}

interface OrderRowProps {
    project: Project
    index: number
    total: number
    disabled: boolean
    onMove: (from: number, to: number) => void
}

function OrderRow({ project, index, total, disabled, onMove }: OrderRowProps) {
    const controls = useDragControls()
    const isFirst = index === 0
    const isLast = index === total - 1

    return (
        <Reorder.Item
            value={project}
            dragListener={false}
            dragControls={controls}
            whileDrag={{ scale: 1.01, boxShadow: "0 20px 40px -12px rgba(15, 23, 42, 0.25)" }}
            className="relative flex items-center gap-3 sm:gap-4 p-3 bg-white rounded-2xl border border-slate-100 shadow-sm select-none"
        >
            <button
                type="button"
                onPointerDown={e => !disabled && controls.start(e)}
                disabled={disabled}
                className="touch-none cursor-grab active:cursor-grabbing p-2 -m-1 rounded-xl text-slate-300 hover:text-slate-600 hover:bg-slate-50 transition-colors disabled:cursor-not-allowed"
                aria-label={`Drag to reorder ${project.title}`}
            >
                <GripVertical className="w-5 h-5" />
            </button>

            <span className="w-6 text-center text-sm font-black text-slate-300 tabular-nums shrink-0">{index + 1}</span>

            <img
                src={project.image || "/placeholder.svg"}
                alt=""
                draggable={false}
                className="w-16 h-12 sm:w-20 sm:h-14 rounded-xl object-cover bg-slate-100 shrink-0"
            />

            <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-900 truncate">{project.title}</p>
                <p className="text-xs text-slate-500 font-medium truncate">
                    {project.category}{project.location ? ` · ${project.location}` : ""}
                </p>
            </div>

            <div className="hidden md:flex items-center gap-2 shrink-0">
                {project.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-wider border border-amber-100">
                        <Star className="w-3 h-3 fill-current" /> Home
                    </span>
                )}
                {project.published === false && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-wider border border-slate-200">
                        <EyeOff className="w-3 h-3" /> Hidden
                    </span>
                )}
            </div>

            <div className="flex items-center gap-0.5 shrink-0">
                <Button type="button" variant="ghost" size="icon" className="hidden sm:inline-flex h-9 w-9 rounded-xl text-slate-500"
                    disabled={disabled || isFirst} onClick={() => onMove(index, 0)} aria-label={`Move ${project.title} to top`} title="Move to top">
                    <ChevronsUp className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500"
                    disabled={disabled || isFirst} onClick={() => onMove(index, index - 1)} aria-label={`Move ${project.title} up`} title="Move up">
                    <ArrowUp className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500"
                    disabled={disabled || isLast} onClick={() => onMove(index, index + 1)} aria-label={`Move ${project.title} down`} title="Move down">
                    <ArrowDown className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="hidden sm:inline-flex h-9 w-9 rounded-xl text-slate-500"
                    disabled={disabled || isLast} onClick={() => onMove(index, total - 1)} aria-label={`Move ${project.title} to bottom`} title="Move to bottom">
                    <ChevronsDown className="w-4 h-4" />
                </Button>
            </div>
        </Reorder.Item>
    )
}
