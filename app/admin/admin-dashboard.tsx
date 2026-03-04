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
import { MapPin, Image as ImageIcon, Star, Eye, MoreVertical, Pencil, Trash2, Globe, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function AdminDashboard({ initialProjects }: { initialProjects: Project[] }) {
    const router = useRouter()
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null)

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
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Project List</h2>
                </div>
                <Button asChild size="sm" className="shadow-sm gap-2">
                    <Link href="/admin/projects/new">
                        <Plus className="w-4 h-4" />
                        Add Project
                    </Link>
                </Button>
            </div>

            {initialProjects.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground border border-dashed rounded-xl">
                    No projects found. Add one to get started.
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {initialProjects.map(project => (
                        <Card key={project.slug} className="flex flex-col justify-between overflow-hidden transition-all hover:shadow-md border-border/50 bg-background/50">
                            <div>
                                <Link href={`/admin/projects/${project.slug}`} className="block group/image">
                                    {project.image && project.image !== "/placeholder.svg" ? (
                                        <div className="relative aspect-[16/9] w-full bg-muted border-b border-border/50 overflow-hidden">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105" />
                                            {project.featured && (
                                                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    HOME
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors" />
                                        </div>
                                    ) : (
                                        <div className="relative aspect-[16/9] w-full bg-muted/50 border-b border-border/50 flex flex-col items-center justify-center text-muted-foreground gap-2 group-hover/image:bg-muted/80 transition-colors">
                                            <ImageIcon className="w-8 h-8 opacity-20" />
                                            <span className="text-xs font-medium uppercase tracking-wider opacity-50">No Cover</span>
                                        </div>
                                    )}
                                </Link>
                                <CardHeader className="px-5 py-4">
                                    <div className="flex justify-between items-start gap-3">
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-xl truncate">
                                                <Link href={`/admin/projects/${project.slug}`} className="hover:text-primary transition-colors">
                                                    {project.title}
                                                </Link>
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-1.5 mt-2">
                                                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold bg-primary/5 text-primary border-primary/10 shrink-0">
                                                    {project.category}
                                                </span>
                                                {project.location && (
                                                    <span className="flex items-center gap-1 text-xs truncate text-muted-foreground">
                                                        <MapPin className="w-3 h-3 shrink-0" />
                                                        <span className="truncate">{project.location}</span>
                                                    </span>
                                                )}
                                            </CardDescription>
                                        </div>
                                        <div className="flex items-center gap-2 pt-0.5">
                                            <Switch
                                                checked={project.featured || false}
                                                onCheckedChange={(checked) => handleToggleFeatured(project, checked)}
                                                className="data-[state=checked]:bg-yellow-500 scale-[0.80] md:scale-95"
                                                title="Toggle Homepage Visibility"
                                            />
                                            <Switch
                                                checked={project.published ?? true}
                                                onCheckedChange={(checked) => handleTogglePublished(project, checked)}
                                                className="data-[state=checked]:bg-emerald-500 scale-[0.80] md:scale-95"
                                                title="Toggle Project Visibility"
                                            />
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted/80">
                                                        <MoreVertical className="h-4 w-4" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/admin/projects/${project.slug}`} className="cursor-pointer">
                                                            <Eye className="mr-2 h-4 w-4" /> View Details
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/projects/${project.slug}`} target="_blank" className="cursor-pointer">
                                                            <Globe className="mr-2 h-4 w-4" /> Open Public
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild className="cursor-pointer font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                        <Link href={`/admin/projects/${project.slug}/edit`}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit Project
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => setProjectToDelete(project.slug)} className="cursor-pointer font-medium text-red-600 focus:text-red-600 hover:bg-red-50">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-5 py-0 pb-4">
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {project.description || "No description provided."}
                                    </p>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <AlertDialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the project from your servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-500 text-white hover:bg-red-600 transition-colors"
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
