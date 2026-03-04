"use client"

import { useState, useCallback, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { Project } from "@/lib/data/projects"
import { addProject, deleteProject, updateProject, uploadImage } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { MapPin, Image as ImageIcon, UploadCloud, Star, Eye, MoreVertical, Pencil, Trash2, Globe, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

function ImageDropzone({ onDrop, accept, multiple, label, currentImages }: any) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, multiple })

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-muted/30 ${isDragActive ? 'border-primary bg-primary/5' : 'border-border bg-background/50'}`}>
                <input {...getInputProps()} />
                <UploadCloud className="w-8 h-8 text-muted-foreground/50 mb-2 object-cover" />
                <p className="text-sm text-foreground font-medium">
                    {isDragActive ? "Drop files here..." : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    SVG, PNG, JPG or GIF
                </p>
            </div>
            {currentImages && currentImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {currentImages.map((src: string, i: number) => (
                        <div key={i} className="relative w-16 h-16 rounded overflow-hidden shadow-sm border">
                            <img src={src} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export function AdminDashboard({ initialProjects }: { initialProjects: Project[] }) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({})
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null)

    const searchParams = useSearchParams()
    const editSlug = searchParams.get('edit')

    useEffect(() => {
        if (editSlug) {
            const projectToEdit = initialProjects.find(p => p.slug === editSlug)
            if (projectToEdit) {
                openEdit(projectToEdit)
            }
        }
    }, [editSlug, initialProjects])

    const [newCoverFile, setNewCoverFile] = useState<File | null>(null)
    const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([])

    const onCoverDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setNewCoverFile(acceptedFiles[0])
            setCurrentProject(prev => ({ ...prev, image: URL.createObjectURL(acceptedFiles[0]) }))
        }
    }, [])

    const onGalleryDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setNewGalleryFiles(prev => [...prev, ...acceptedFiles])
            const newFileUrls = acceptedFiles.map(file => URL.createObjectURL(file))
            setCurrentProject(prev => ({
                ...prev,
                gallery: [...(prev.gallery || []), ...newFileUrls]
            }))
        }
    }, [])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!currentProject.slug || !currentProject.title) return

        setIsSubmitting(true)
        try {
            let finalCoverImage = currentProject.image || "/placeholder.svg";
            if (newCoverFile) {
                const formData = new FormData()
                formData.append("file", newCoverFile)
                const uploadedPath = await uploadImage(formData)
                if (uploadedPath) finalCoverImage = uploadedPath
            }

            let finalGallery = [...(currentProject.gallery || [])];

            // Remove blob URLs from final gallery logic as they are local temp URLs
            finalGallery = finalGallery.filter(url => !url.startsWith("blob:"));

            if (newGalleryFiles.length > 0) {
                for (const file of newGalleryFiles) {
                    const formData = new FormData()
                    formData.append("file", file)
                    const uploadedPath = await uploadImage(formData)
                    if (uploadedPath) finalGallery.push(uploadedPath)
                }
            }

            const isUpdate = initialProjects.some(p => p.slug === currentProject.slug)

            const projectToSave: Project = {
                slug: currentProject.slug,
                title: currentProject.title,
                location: currentProject.location || "",
                category: currentProject.category as "Residential" | "Commercial" || "Residential",
                area: currentProject.area || "",
                year: currentProject.year || new Date().getFullYear().toString(),
                description: currentProject.description || "",
                featured: currentProject.featured || false,
                published: currentProject.published ?? true,
                image: finalCoverImage,
                gallery: finalGallery
            }

            if (isUpdate) {
                await updateProject(projectToSave)
                toast.success("Project updated successfully")
            } else {
                await addProject(projectToSave)
                toast.success("Project created successfully")
            }

            setIsEditing(false)
            setCurrentProject({})
            router.refresh()
        } catch (error) {
            console.error("Error saving project:", error)
        } finally {
            setIsSubmitting(false)
        }
    }



    const openEdit = (p?: Partial<Project>) => {
        setIsEditing(true)
        setNewCoverFile(null)
        setNewGalleryFiles([])
        if (p) {
            setCurrentProject({ ...p })
        } else {
            setCurrentProject({ category: "Residential", gallery: [], featured: false, published: true }) // Defaults
        }
    }

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
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Project List</h2>
                    </div>
                    {!isEditing && (
                        <Button onClick={() => openEdit({ featured: false })} size="sm" className="shadow-sm gap-2">
                            <Plus className="w-4 h-4" />
                            Add Project
                        </Button>
                    )}
                </div>

                {initialProjects.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground border border-dashed rounded-xl">
                        No projects found. Add one to get started.
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2">
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
                                                        <DropdownMenuItem onClick={() => openEdit(project)} className="cursor-pointer font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit Project
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
            </div>

            <div className="lg:col-span-1">
                {isEditing ? (
                    <form onSubmit={handleSave} className="bg-muted/10 border border-border/50 p-6 rounded-xl space-y-6 sticky top-24 shadow-sm">
                        <div className="flex flex-col space-y-1.5">
                            <h3 className="text-xl font-semibold leading-none tracking-tight">
                                {initialProjects.some(p => p.slug === currentProject.slug) ? 'Edit Project' : 'New Project'}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                {initialProjects.some(p => p.slug === currentProject.slug) ? 'Update the details of your project below.' : 'Fill in the details to create a new project.'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Title</label>
                                <Input
                                    required
                                    placeholder="e.g. Hillside Residence"
                                    value={currentProject.title || ""}
                                    onChange={e => setCurrentProject(prev => ({ ...prev, title: e.target.value, slug: prev.slug || e.target.value.toLowerCase().replace(/[\s\W]+/g, '-') }))}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Category</label>
                                    <Select
                                        value={currentProject.category || "Residential"}
                                        onValueChange={val => setCurrentProject(prev => ({ ...prev, category: val as "Residential" | "Commercial" }))}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Residential">Residential</SelectItem>
                                            <SelectItem value="Commercial">Commercial</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Location</label>
                                    <Input
                                        placeholder="e.g. Calicut, Kerala"
                                        value={currentProject.location || ""}
                                        onChange={e => setCurrentProject(prev => ({ ...prev, location: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 border p-3 rounded-md bg-background/50 border-input">
                                <Switch
                                    id="featured-mode"
                                    checked={currentProject.featured || false}
                                    onCheckedChange={(checked) => setCurrentProject(prev => ({ ...prev, featured: checked }))}
                                />
                                <div className="space-y-0.5">
                                    <label htmlFor="featured-mode" className="text-sm font-medium leading-none cursor-pointer">
                                        Show on Home Page
                                    </label>
                                    <p className="text-[12px] text-muted-foreground">
                                        Turn this on to display this project in the featured section.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 border p-3 rounded-md bg-background/50 border-input">
                                <Switch
                                    id="published-mode"
                                    checked={currentProject.published ?? true}
                                    onCheckedChange={(checked) => setCurrentProject(prev => ({ ...prev, published: checked }))}
                                />
                                <div className="space-y-0.5">
                                    <label htmlFor="published-mode" className="text-sm font-medium leading-none cursor-pointer">
                                        Listed (Public)
                                    </label>
                                    <p className="text-[12px] text-muted-foreground">
                                        If off, this project will not be visible on the public website.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Description</label>
                                <Textarea
                                    rows={4}
                                    placeholder="Write a brief description about the project..."
                                    className="resize-none"
                                    value={currentProject.description || ""}
                                    onChange={e => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
                                />
                            </div>
                        </div>

                        <ImageDropzone
                            label="Cover Image"
                            accept={{ 'image/*': [] }}
                            multiple={false}
                            onDrop={onCoverDrop}
                            currentImages={currentProject.image && currentProject.image !== "/placeholder.svg" ? [currentProject.image] : []}
                        />

                        <ImageDropzone
                            label="Gallery Images"
                            accept={{ 'image/*': [] }}
                            multiple={true}
                            onDrop={onGalleryDrop}
                            currentImages={currentProject.gallery || []}
                        />

                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button type="submit" className="flex-1" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</Button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-muted/10 border border-dashed rounded-xl p-8 text-center text-muted-foreground flex flex-col items-center justify-center h-full min-h-[400px]">
                        <p>Select a project to edit or create a new one.</p>
                    </div>
                )}
            </div>

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
