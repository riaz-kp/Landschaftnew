import { Suspense } from "react"
import fs from "fs"
import path from "path"
import { AdminDashboard } from "./admin-dashboard"
import { Project } from "@/lib/data/projects"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutGrid, Home, Tag } from "lucide-react"

export default async function AdminPage() {
    const dataFilePath = path.join(process.cwd(), "lib", "data", "projects.json")
    let projects: Project[] = []

    if (fs.existsSync(dataFilePath)) {
        const fileContents = fs.readFileSync(dataFilePath, "utf8")
        projects = JSON.parse(fileContents)
    }

    const featuredCount = projects.filter(p => p.featured).length
    const residentialCount = projects.filter(p => p.category === "Residential").length
    const commercialCount = projects.filter(p => p.category === "Commercial").length

    return (
        <div className="p-6 md:p-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Project Management</h1>
                    <p className="mt-2 text-slate-500 max-w-2xl text-lg">
                        Curate your professional portfolio. Manage details, gallery, and visibility.
                    </p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600">
                            <LayoutGrid className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Projects</p>
                            <p className="text-2xl font-bold text-slate-900">{projects.length}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600">
                            <Home className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">On Home Page</p>
                            <p className="text-2xl font-bold text-slate-900">{featuredCount}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Tag className="w-6 h-6" />
                        </div>
                        <div className="flex gap-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Residential</p>
                                <p className="text-2xl font-bold text-slate-900">{residentialCount}</p>
                            </div>
                            <div className="w-[1px] h-10 bg-slate-100 hidden sm:block" />
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Commercial</p>
                                <p className="text-2xl font-bold text-slate-900">{commercialCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Suspense fallback={<div className="flex items-center justify-center p-24 opacity-50 italic">Loading your projects...</div>}>
                <AdminDashboard initialProjects={projects} />
            </Suspense>
        </div>
    )
}
