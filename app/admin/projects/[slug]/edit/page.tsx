import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { ProjectForm } from "@/components/admin/project-form"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/data/projects"

interface PageProps {
    params: Promise<{
        slug: string
    }>
}


export default async function EditProjectPage({ params }: PageProps) {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)

    if (!project) {
        notFound()
    }

    return (
        <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/projects/${slug}`}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Details
                    </Link>
                </Button>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Edit Project</h1>
                <p className="text-slate-500">Update the details for <strong>{project.title}</strong>.</p>
            </div>

            <div className="mt-8">
                <ProjectForm initialData={project} isEdit={true} />
            </div>
        </div>
    )
}
