import { Suspense } from "react"
import { CareerDashboard } from "./career-dashboard"
import { getCareers } from "@/lib/data/careers"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, UserPlus, FileText } from "lucide-react"

export default async function CareersAdminPage() {
    const careers = await getCareers()

    const liveCount = careers.filter(c => c.published).length
    const draftCount = careers.length - liveCount

    return (
        <div className="p-6 md:p-10 space-y-8 max-w-[1400px] mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
                <div className="space-y-1">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Careers & Opportunities</h1>
                    <p className="text-slate-500 font-medium">Manage job openings and studio growth.</p>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white border-transparent p-[1px] rounded-3xl bg-gradient-to-br from-indigo-200 to-indigo-100 shadow-sm transition-all hover:shadow-md duration-500">
                    <Card className="bg-white/95 border-none rounded-[23px] shadow-none h-full">
                        <CardContent className="p-6 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Total Posts</p>
                                <p className="text-3xl font-black text-slate-900 leading-none">{careers.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-white border-transparent p-[1px] rounded-3xl bg-gradient-to-br from-emerald-200 to-emerald-100 shadow-sm transition-all hover:shadow-md duration-500">
                    <Card className="bg-white/95 border-none rounded-[23px] shadow-none h-full">
                        <CardContent className="p-6 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                                <UserPlus className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Live Opening</p>
                                <p className="text-3xl font-black text-slate-900 leading-none">{liveCount}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-white border-transparent p-[1px] rounded-3xl bg-gradient-to-br from-slate-200 to-slate-100 shadow-sm transition-all hover:shadow-md duration-500">
                    <Card className="bg-white/95 border-none rounded-[23px] shadow-none h-full">
                        <CardContent className="p-6 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Drafts</p>
                                <p className="text-3xl font-black text-slate-900 leading-none">{draftCount}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Suspense fallback={<div className="flex items-center justify-center p-24 opacity-50 italic font-medium">Loading positions...</div>}>
                <CareerDashboard initialCareers={careers} />
            </Suspense>
        </div>
    )
}
