"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { Project } from "@/lib/data/projects"
import { addProject, updateProject, uploadImage } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { UploadCloud, X } from "lucide-react"

function ImageDropzone({ onDrop, onRemove, accept, multiple, label, currentImages }: any) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, multiple })

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-muted/30 ${isDragActive ? 'border-primary bg-primary/5' : 'border-border bg-background/50'}`}>
                <input {...getInputProps()} />
                <UploadCloud className="w-8 h-8 text-muted-foreground/50 mb-2" />
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
                        <div key={i} className="relative w-16 h-16 rounded overflow-hidden shadow-sm border group">
                            <img src={src} className="w-full h-full object-cover" alt="Preview" />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove(i);
                                }}
                                className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

interface ProjectFormProps {
    initialData?: Partial<Project>
    isEdit?: boolean
}

export function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<Partial<Project>>(initialData || {
        category: "Residential",
        gallery: [],
        featured: false,
        published: true,
        title: "",
        slug: "",
        location: "",
        description: "",
        area: "",
        year: new Date().getFullYear().toString()
    })

    const [newCoverFile, setNewCoverFile] = useState<File | null>(null)
    const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([])

    const onCoverDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setNewCoverFile(acceptedFiles[0])
            setFormData(prev => ({ ...prev, image: URL.createObjectURL(acceptedFiles[0]) }))
        }
    }, [])

    const onGalleryDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setNewGalleryFiles(prev => [...prev, ...acceptedFiles])
            const newFileUrls = acceptedFiles.map(file => URL.createObjectURL(file))
            setFormData(prev => ({
                ...prev,
                gallery: [...(prev.gallery || []), ...newFileUrls]
            }))
        }
    }, [])

    const handleRemoveCover = () => {
        setNewCoverFile(null)
        setFormData(prev => ({ ...prev, image: "/placeholder.svg" }))
    }

    const handleRemoveGalleryImage = (index: number) => {
        const urlToRemove = formData.gallery?.[index]
        if (!urlToRemove) return

        if (urlToRemove.startsWith("blob:")) {
            const blobUrlsBefore = formData.gallery?.slice(0, index).filter(u => u.startsWith("blob:")) || []
            const fileIndex = blobUrlsBefore.length
            setNewGalleryFiles(prev => prev.filter((_, i) => i !== fileIndex))
        }

        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery?.filter((_, i) => i !== index)
        }))
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.slug || !formData.title) {
            toast.error("Title and Slug are required")
            return
        }

        setIsSubmitting(true)
        try {
            let finalCoverImage = formData.image || "/placeholder.svg";
            if (newCoverFile) {
                const uploadFormData = new FormData()
                uploadFormData.append("file", newCoverFile)
                const uploadedPath = await uploadImage(uploadFormData)
                if (uploadedPath) finalCoverImage = uploadedPath
            }

            let finalGallery = [...(formData.gallery || [])];
            finalGallery = finalGallery.filter(url => !url.startsWith("blob:"));

            if (newGalleryFiles.length > 0) {
                for (const file of newGalleryFiles) {
                    const uploadFormData = new FormData()
                    uploadFormData.append("file", file)
                    const uploadedPath = await uploadImage(uploadFormData)
                    if (uploadedPath) finalGallery.push(uploadedPath)
                }
            }

            const projectToSave: Project = {
                slug: formData.slug,
                title: formData.title,
                location: formData.location || "",
                category: formData.category as "Residential" | "Commercial" || "Residential",
                area: formData.area || "",
                year: formData.year || new Date().getFullYear().toString(),
                description: formData.description || "",
                featured: formData.featured || false,
                published: formData.published ?? true,
                image: finalCoverImage,
                gallery: finalGallery
            }

            if (isEdit) {
                await updateProject(projectToSave)
                toast.success("Project updated successfully")
            } else {
                await addProject(projectToSave)
                toast.success("Project created successfully")
            }

            router.push("/admin")
            router.refresh()
        } catch (error) {
            console.error("Error saving project:", error)
            toast.error("Failed to save project")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSave} className="bg-white border rounded-xl p-8 space-y-8 shadow-sm max-w-4xl mx-auto">
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                        required
                        placeholder="e.g. Hillside Residence"
                        value={formData.title || ""}
                        onChange={e => {
                            const title = e.target.value
                            setFormData(prev => ({
                                ...prev,
                                title,
                                slug: isEdit ? prev.slug : title.toLowerCase().replace(/[\s\W]+/g, '-')
                            }))
                        }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select
                            value={formData.category || "Residential"}
                            onValueChange={val => setFormData(prev => ({ ...prev, category: val as "Residential" | "Commercial" }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Residential">Residential</SelectItem>
                                <SelectItem value="Commercial">Commercial</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input
                            placeholder="e.g. Calicut, Kerala"
                            value={formData.location || ""}
                            onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center space-x-2 border p-4 rounded-xl bg-slate-50">
                        <Switch
                            id="featured-mode"
                            checked={formData.featured || false}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                        />
                        <div className="space-y-0.5">
                            <label htmlFor="featured-mode" className="text-sm font-medium cursor-pointer">
                                Featured
                            </label>
                            <p className="text-xs text-muted-foreground">Show on home page</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 border p-4 rounded-xl bg-slate-50">
                        <Switch
                            id="published-mode"
                            checked={formData.published ?? true}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                        />
                        <div className="space-y-0.5">
                            <label htmlFor="published-mode" className="text-sm font-medium cursor-pointer">
                                Listed
                            </label>
                            <p className="text-xs text-muted-foreground">Publicly visible</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                        rows={6}
                        placeholder="Write a brief description about the project..."
                        className="resize-none"
                        value={formData.description || ""}
                        onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ImageDropzone
                        label="Cover Image"
                        accept={{ 'image/*': [] }}
                        multiple={false}
                        onDrop={onCoverDrop}
                        onRemove={handleRemoveCover}
                        currentImages={formData.image && formData.image !== "/placeholder.svg" ? [formData.image] : []}
                    />

                    <ImageDropzone
                        label="Gallery Images"
                        accept={{ 'image/*': [] }}
                        multiple={true}
                        onDrop={onGalleryDrop}
                        onRemove={handleRemoveGalleryImage}
                        currentImages={formData.gallery || []}
                    />
                </div>
            </div>

            <div className="flex gap-4 pt-6 border-t">
                <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project')}
                </Button>
            </div>
        </form>
    )
}
