import { Suspense } from "react"
import { AdminDashboard } from "./admin-dashboard"
import { getProjects } from "@/lib/data/projects"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutGrid, Home, Tag } from "lucide-react"

export default async function AdminPage() {
    const projects = await getProjects()

    const featuredCount = projects.filter(p => p.featured).length
    const residentialCount = projects.filter(p => p.category === "Residential").length
    const commercialCount = projects.filter(p => p.category === "Commercial").length

    return (
        <div className="p-6 md:p-10 space-y-8 max-w-[1600px] mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
                <div className="space-y-1">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Project Management</h1>
                    <p className="text-slate-500 font-medium">Manage and monitor your architectural portfolio from here.</p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white border-transparent p-[1px] rounded-3xl bg-gradient-to-br from-slate-200 to-slate-100 shadow-sm transition-all hover:shadow-md duration-500">
                    <Card className="bg-white/95 border-none rounded-[23px] shadow-none h-full">
                        <CardContent className="p-6 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
                                <LayoutGrid className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Total Portfolio</p>
                                <p className="text-3xl font-black text-slate-900 leading-none">{projects.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-white border-transparent p-[1px] rounded-3xl bg-gradient-to-br from-amber-200 to-orange-100 shadow-sm transition-all hover:shadow-md duration-500">
                    <Card className="bg-white/95 border-none rounded-[23px] shadow-none h-full">
                        <CardContent className="p-6 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-100">
                                <Home className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Featured Live</p>
                                <p className="text-3xl font-black text-slate-900 leading-none">{featuredCount}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-white border-transparent p-[1px] rounded-3xl bg-gradient-to-br from-indigo-200 to-indigo-100 shadow-sm transition-all hover:shadow-md duration-500">
                    <Card className="bg-white/95 border-none rounded-[23px] shadow-none h-full">
                        <CardContent className="p-6 flex items-center gap-5 shrink-0">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100 shrink-0">
                                <Tag className="w-6 h-6" />
                            </div>
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Residential</p>
                                    <p className="text-2xl font-black text-slate-900">{residentialCount}</p>
                                </div>
                                <div className="w-px h-8 bg-slate-100 self-center" />
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Commercial</p>
                                    <p className="text-2xl font-black text-slate-900">{commercialCount}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Suspense fallback={<div className="flex items-center justify-center p-24 opacity-50 italic">Loading your projects...</div>}>
                <AdminDashboard initialProjects={projects} />
            </Suspense>
        </div>
    )
}
