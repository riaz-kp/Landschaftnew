import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectForm } from "@/components/admin/project-form"
import { Button } from "@/components/ui/button"

export default function NewProjectPage() {
    return (
        <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </Button>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create New Project</h1>
                <p className="text-slate-500">Fill in the details below to add a new project to your portfolio.</p>
            </div>

            <div className="mt-8">
                <ProjectForm />
            </div>
        </div>
    )
}
