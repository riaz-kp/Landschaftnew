"use client"

import { useState } from "react"
import { Career } from "@/lib/data/careers"
import { addCareer, deleteCareer, updateCareer } from "./actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MapPin, Briefcase, Clock, MoreVertical, Pencil, Trash2, Plus, Search, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CareerDashboard({ initialCareers }: { initialCareers: Career[] }) {
    const router = useRouter()
    const [idToDelete, setIdToDelete] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingCareer, setEditingCareer] = useState<Career | null>(null)

    const filteredCareers = initialCareers.filter(career => {
        const query = searchTerm.toLowerCase()
        return (
            career.title.toLowerCase().includes(query) ||
            career.department.toLowerCase().includes(query) ||
            career.location.toLowerCase().includes(query)
        )
    })

    const handleTogglePublished = async (career: Career, published: boolean) => {
        try {
            await updateCareer({ ...career, published })
            toast.success(`Position ${published ? 'published' : 'unpublished'} successfully`)
            router.refresh()
        } catch (error) {
            toast.error("Failed to update status")
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const careerData: Career = {
            id: editingCareer?.id || `job-${Date.now()}`,
            title: formData.get("title") as string,
            department: formData.get("department") as string,
            type: formData.get("type") as string,
            location: formData.get("location") as string,
            description: formData.get("description") as string,
            requirements: (formData.get("requirements") as string).split("\n").filter(r => r.trim()),
            published: editingCareer ? editingCareer.published : true,
            createdAt: editingCareer ? editingCareer.createdAt : new Date().toISOString()
        }

        try {
            if (editingCareer) {
                await updateCareer(careerData)
                toast.success("Position updated successfully")
            } else {
                await addCareer(careerData)
                toast.success("Position added successfully")
            }
            setIsDialogOpen(false)
            setEditingCareer(null)
            router.refresh()
        } catch (error) {
            toast.error("An error occurred")
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Toolbar */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-slate-50/50 p-4 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-4 w-1 bg-primary rounded-full" />
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Career Openings</h2>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Search positions..."
                            className="pl-12 h-12 bg-white border-transparent shadow-sm rounded-2xl focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={() => { setEditingCareer(null); setIsDialogOpen(true) }}
                        className="h-12 px-6 rounded-2xl bg-slate-900 hover:bg-black text-white shadow-lg gap-2 shrink-0 font-bold transition-all hover:-translate-y-0.5"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Position</span>
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {filteredCareers.length === 0 ? (
                    <div className="p-20 text-center flex flex-col items-center gap-4 rounded-[40px] bg-slate-50/50 border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <Briefcase className="w-8 h-8 opacity-20" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No positions found</h3>
                    </div>
                ) : (
                    filteredCareers.map(career => (
                        <div key={career.id} className="group relative bg-white rounded-3xl border border-slate-100 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                            <Link
                                href={`/admin/careers/${career.id}`}
                                className="space-y-2 flex-1 cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{career.title}</h3>
                                    <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                                        {career.department}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {career.location}</span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {career.type}</span>
                                </div>
                            </Link>

                            <div className="flex items-center gap-6 self-end md:self-center">
                                <div className="flex items-center gap-3 pr-6 border-r border-slate-100">
                                    <Switch
                                        checked={career.published}
                                        onCheckedChange={(checked) => handleTogglePublished(career, checked)}
                                        className="data-[state=checked]:bg-primary h-5 w-9"
                                    />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        {career.published ? 'Live' : 'Draft'}
                                    </span>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-slate-50">
                                            <MoreVertical className="h-5 w-5 text-slate-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-slate-100 shadow-2xl">
                                        <DropdownMenuItem
                                            asChild
                                            className="flex items-center rounded-xl py-2.5 cursor-pointer text-slate-600 focus:text-primary"
                                        >
                                            <Link href={`/careers/${career.id}`} target="_blank">
                                                <ExternalLink className="mr-3 h-4 w-4" />
                                                <span className="font-bold">View Public Post</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => { setEditingCareer(career); setIsDialogOpen(true) }}
                                            className="flex items-center rounded-xl py-2.5 cursor-pointer text-indigo-600 focus:text-indigo-700"
                                        >
                                            <Pencil className="mr-3 h-4 w-4" />
                                            <span className="font-bold">Edit Details</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => setIdToDelete(career.id)}
                                            className="flex items-center rounded-xl py-2.5 cursor-pointer text-rose-600 focus:text-rose-700"
                                        >
                                            <Trash2 className="mr-3 h-4 w-4" />
                                            <span className="font-bold">Delete Post</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingCareer(null) }}>
                <DialogContent className="max-w-2xl rounded-[32px] p-8 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900">
                            {editingCareer ? "Edit Position" : "Create New Position"}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Position Title</Label>
                                <Input name="title" defaultValue={editingCareer?.title} placeholder="e.g. Senior Architect" required className="rounded-xl h-12" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Department</Label>
                                <Input name="department" defaultValue={editingCareer?.department} placeholder="e.g. Design Studio" required className="rounded-xl h-12" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Type</Label>
                                <Select name="type" defaultValue={editingCareer?.type || "Full-time"}>
                                    <SelectTrigger className="rounded-xl h-12">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Internship">Internship</SelectItem>
                                        <SelectItem value="Freelance">Freelance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Location</Label>
                                <Input name="location" defaultValue={editingCareer?.location} placeholder="e.g. Kondotty, Kerala" required className="rounded-xl h-12" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Description</Label>
                            <Textarea name="description" defaultValue={editingCareer?.description} placeholder="Describe the role..." required className="rounded-xl min-h-[120px]" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-slate-400">Requirements (One per line)</Label>
                            <Textarea name="requirements" defaultValue={editingCareer?.requirements.join("\n")} placeholder="Required skills..." required className="rounded-xl min-h-[120px]" />
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="submit" className="w-full sm:w-auto h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
                                {editingCareer ? "Save Changes" : "Post Position"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!idToDelete} onOpenChange={(open) => !open && setIdToDelete(null)}>
                <AlertDialogContent className="rounded-[32px] p-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-black text-slate-900">Remove position?</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500 text-lg">
                            This will permanently delete the job posting.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8">
                        <AlertDialogCancel className="rounded-2xl h-12 font-bold border-slate-200">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                if (idToDelete) {
                                    await deleteCareer(idToDelete)
                                    toast.success("Position removed")
                                    setIdToDelete(null)
                                    router.refresh()
                                }
                            }}
                            className="bg-rose-500 hover:bg-rose-600 rounded-2xl h-12 font-bold shadow-lg shadow-rose-100"
                        >
                            Yes, delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
