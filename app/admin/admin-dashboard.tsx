"use client"

import { useState } from "react"
import { Project } from "@/lib/data/projects"
import { deleteProject, updateProject } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Image as ImageIcon, Star, Eye, MoreVertical, Pencil, Trash2, Globe, Plus, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function AdminDashboard({ initialProjects }: { initialProjects: Project[] }) {
    const router = useRouter()
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("All")

    const filteredProjects = initialProjects.filter(project => {
        const query = searchTerm.toLowerCase()
        const matchesSearch = (
            project.title.toLowerCase().includes(query) ||
            project.location.toLowerCase().includes(query) ||
            project.category.toLowerCase().includes(query)
        )
        const matchesCategory = categoryFilter === "All" || project.category === categoryFilter
        return matchesSearch && matchesCategory
    })

    const handleTogglePublished = async (project: Project, published: boolean) => {
        try {
            await updateProject({ ...project, published })
            toast.success(`Project ${published ? 'listed' : 'unlisted'} successfully`)
            router.refresh()
        } catch (error) {
            toast.error("Failed to update project status")
        }
    }

    const handleToggleFeatured = async (project: Project, featured: boolean) => {
        try {
            await updateProject({ ...project, featured })
            toast.success(`Project ${featured ? 'added to' : 'removed from'} home page`)
            router.refresh()
        } catch (error) {
            toast.error("Failed to update project status")
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Toolbar */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-slate-50/50 p-4 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-4 w-1 bg-emerald-500 rounded-full" />
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Portfolio Inventory</h2>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-4xl">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search by title, location..."
                            className="pl-12 h-12 bg-white border-transparent shadow-sm rounded-2xl focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/30 transition-all font-medium placeholder:text-slate-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[180px] h-12 bg-white border-transparent shadow-sm rounded-2xl focus:ring-emerald-500/20 transition-all font-semibold text-slate-600">
                                <Filter className="w-4 h-4 mr-2 text-slate-400" />
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent align="end" className="rounded-2xl border-slate-100 shadow-xl">
                                <SelectItem value="All" className="rounded-lg">All Categories</SelectItem>
                                <SelectItem value="Residential" className="rounded-lg">Residential</SelectItem>
                                <SelectItem value="Commercial" className="rounded-lg">Commercial</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button asChild className="h-12 px-6 rounded-2xl bg-slate-900 hover:bg-black text-white shadow-lg shadow-slate-200 gap-2 shrink-0 font-bold transition-all hover:-translate-y-0.5 active:translate-y-0">
                            <Link href="/admin/projects/new">
                                <Plus className="w-5 h-5" />
                                <span>Create Project</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {filteredProjects.length === 0 ? (
                <div className="p-20 text-center flex flex-col items-center gap-4 rounded-[40px] bg-slate-50/50 border-2 border-dashed border-slate-200">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                        <Search className="w-8 h-8 opacity-20" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">No matches found</h3>
                        <p className="text-slate-500 max-w-xs mx-auto mt-1">
                            {searchTerm ? `We couldn't find any projects matching "${searchTerm}" in ${categoryFilter === 'All' ? 'any category' : categoryFilter}.` : "Your portfolio is currently empty. Start by adding your first project."}
                        </p>
                    </div>
                    {searchTerm && (
                        <Button variant="outline" onClick={() => { setSearchTerm(""); setCategoryFilter("All") }} className="mt-4 rounded-xl">
                            Clear all filters
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map(project => (
                        <div key={project.slug} className="group relative flex flex-col bg-white rounded-[32px] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 overflow-hidden">
                            {/* Card Header/Controls */}
                            <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start pointer-events-none">
                                <div className="flex gap-2">
                                    {project.featured && (
                                        <div className="px-3 py-1.5 rounded-full bg-amber-500 text-white text-[10px] font-black tracking-widest uppercase border border-amber-400 shadow-lg flex items-center gap-1.5 animate-in zoom-in duration-300">
                                            <Star className="w-3 h-3 fill-current" />
                                            Home
                                        </div>
                                    )}
                                </div>
                                <div className="pointer-events-auto transition-opacity duration-300">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="secondary" size="icon" className="h-9 w-9 bg-white/90 backdrop-blur-md hover:bg-white border border-slate-200 rounded-full shadow-lg">
                                                <MoreVertical className="h-4 w-4 text-slate-900" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-slate-100 shadow-2xl">
                                            <DropdownMenuItem asChild>
                                                <Link href={`/admin/projects/${project.slug}`} className="flex items-center rounded-xl py-2.5 cursor-pointer">
                                                    <Eye className="mr-3 h-4 w-4 text-slate-500" />
                                                    <span className="font-semibold">View Details</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/projects/${project.slug}`} target="_blank" className="flex items-center rounded-xl py-2.5 cursor-pointer">
                                                    <Globe className="mr-3 h-4 w-4 text-slate-500" />
                                                    <span className="font-semibold">Live Preview</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="my-1 bg-slate-50" />
                                            <DropdownMenuItem asChild>
                                                <Link href={`/admin/projects/${project.slug}/edit`} className="flex items-center rounded-xl py-2.5 cursor-pointer text-indigo-600 focus:text-indigo-700 focus:bg-indigo-50">
                                                    <Pencil className="mr-3 h-4 w-4" />
                                                    <span className="font-bold">Edit Project</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setProjectToDelete(project.slug)} className="flex items-center rounded-xl py-2.5 cursor-pointer text-rose-600 focus:text-rose-700 focus:bg-rose-50">
                                                <Trash2 className="mr-3 h-4 w-4" />
                                                <span className="font-bold">Delete Project</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            {/* Image Section */}
                            <Link href={`/admin/projects/${project.slug}`} className="relative aspect-[4/3] overflow-hidden bg-slate-100 block">
                                <img
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Bottom Info Overlay on Hover */}
                                <div className="absolute bottom-4 left-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{project.category}</p>
                                    <p className="font-bold text-lg">{project.location}</p>
                                </div>
                            </Link>

                            {/* Content Section */}
                            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                        <Link href={`/admin/projects/${project.slug}`} className="group/title">
                                            <h3 className="text-xl font-bold text-slate-900 group-hover/title:text-emerald-600 transition-colors leading-tight">
                                                {project.title}
                                            </h3>
                                        </Link>
                                    </div>
                                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium mb-4">
                                        {project.description || "No description provided for this architectural masterpiece yet."}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-[11px] font-bold border border-slate-100">
                                            {project.category}
                                        </span>
                                        {project.location && (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50/50 text-emerald-700 text-[11px] font-bold border border-emerald-100">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {project.location}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-6 mt-2 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={project.featured || false}
                                                onCheckedChange={(checked) => handleToggleFeatured(project, checked)}
                                                className="data-[state=checked]:bg-amber-500 h-5 w-9"
                                                title="Show on Homepage"
                                            />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Home</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={project.published ?? true}
                                                onCheckedChange={(checked) => handleTogglePublished(project, checked)}
                                                className="data-[state=checked]:bg-emerald-500 h-5 w-9"
                                                title="Public Visibility"
                                            />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Live</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AlertDialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
                <AlertDialogContent className="rounded-[32px] border-slate-100 p-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black text-slate-900">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 text-lg">
                            This action cannot be undone. This will permanently remove <span className="font-bold text-slate-900">{projectToDelete}</span> from your architectural portfolio.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8">
                        <AlertDialogCancel className="rounded-2xl h-12 px-6 font-bold border-slate-200">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-rose-500 text-white hover:bg-rose-600 transition-colors rounded-2xl h-12 px-6 font-bold shadow-lg shadow-rose-100"
                            onClick={async () => {
                                if (projectToDelete) {
                                    try {
                                        await deleteProject(projectToDelete)
                                        toast.success("Project deleted permanently")
                                        router.refresh()
                                    } catch (e) {
                                        toast.error("Failed to delete project")
                                    } finally {
                                        setProjectToDelete(null)
                                    }
                                }
                            }}
                        >
                            Yes, delete project
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
