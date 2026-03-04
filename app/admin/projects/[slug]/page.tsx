import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Edit, ExternalLink, MapPin, Tag } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/data/projects"
import { Badge } from "@/components/ui/badge"

interface PageProps {
    params: {
        slug: string
    }
}

export default async function AdminProjectDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)

    if (!project) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pb-12">
            <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
                <div className="px-6 py-4 flex items-center justify-between mx-auto max-w-6xl">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild className="hover:bg-slate-100">
                            <Link href="/admin">
                                <ArrowLeft className="h-4 w-4 mr-2 text-slate-500" /> Back
                            </Link>
                        </Button>
                        <div className="h-4 w-[1px] bg-slate-200" />
                        <h1 className="text-lg font-bold text-slate-900 truncate max-w-[150px] md:max-w-md">{project.title}</h1>
                        {project.featured && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200 ml-2">
                                Featured
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild className="hidden sm:flex border-slate-200">
                            <Link href={`/projects/${project.slug}`} target="_blank">
                                <ExternalLink className="h-3.5 w-3.5 mr-2 text-slate-500" /> Public
                            </Link>
                        </Button>
                        <Button size="sm" asChild className="shadow-sm">
                            <Link href={`/admin?edit=${project.slug}`}>
                                <Edit className="h-3.5 w-3.5 mr-2" /> Edit
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="px-6 py-8 mx-auto max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-background rounded-xl border p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-6">Project Images</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Cover Image</h3>
                                    <div className="aspect-[16/9] w-full bg-muted rounded-lg overflow-hidden border">
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">No cover image</div>
                                        )}
                                    </div>
                                </div>

                                {project.gallery && project.gallery.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">Gallery</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {project.gallery.map((img, i) => (
                                                <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden border group relative">
                                                    <img src={img} alt={`${project.title} gallery ${i}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-background rounded-xl border p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Description</h2>
                            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {project.description || "No description provided."}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-background rounded-xl border p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-6">Project Info</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Tag className="w-5 h-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-semibold">Category</p>
                                        <p className="text-sm font-medium">{project.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-semibold">Location</p>
                                        <p className="text-sm font-medium">{project.location || "Not specified"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-background rounded-xl border border-yellow-500/20 p-6 shadow-sm ring-1 ring-yellow-500/5">
                            <h2 className="text-lg font-semibold mb-2">Visibility Settings</h2>
                            <p className="text-sm text-muted-foreground mb-4">Control how this project appears on your public website.</p>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                                <span className="text-sm font-medium">Show on Home Page</span>
                                <Badge variant={project.featured ? "default" : "outline"} className={project.featured ? "bg-yellow-500 hover:bg-yellow-600" : ""}>
                                    {project.featured ? "On" : "Off"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
