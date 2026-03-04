import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Briefcase, ClipboardCheck, ArrowLeft, Pencil, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { getCareerById } from "@/lib/data/careers"
import { notFound } from "next/navigation"

export default async function AdminCareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const career = await getCareerById(id)

    if (!career) {
        notFound()
    }

    return (
        <div className="p-6 md:p-10 space-y-8 max-w-[1000px] mx-auto min-h-screen">
            <div className="flex items-center justify-between gap-4">
                <Button variant="ghost" className="hover:bg-slate-100 hover:text-slate-900 transition-all rounded-full px-6 h-10 text-slate-500 font-bold uppercase tracking-widest text-[10px]" asChild>
                    <Link href="/admin/careers" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Link>
                </Button>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl border-slate-200 hover:border-primary/30 hover:bg-primary/[0.02] hover:text-primary gap-2 h-11 px-6 font-bold transition-all" asChild>
                        <Link href="/admin/careers">
                            <Pencil className="w-4 h-4" />
                            Edit in Dashboard
                        </Link>
                    </Button>
                    <Button variant="ghost" className="rounded-2xl text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 gap-2 h-11 px-6 font-bold transition-all" asChild>
                        <Link href={`/careers/${career.id}`} target="_blank">
                            Go to Public Post
                            <ExternalLink className="w-4 h-4 opacity-50" />
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                <div className="p-10 space-y-8">
                    {/* Status Header */}
                    <div className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-50 pb-8">
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                                    {career.department}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    {career.type}
                                </span>
                                {career.published ? (
                                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Live
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest">
                                        Draft
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 leading-tight">
                                {career.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-bold uppercase tracking-wider">
                                <span className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {career.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Posted on {new Date(career.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-10">
                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                    <Briefcase className="w-5 h-5 text-primary" />
                                    Role Description
                                </h3>
                                <div className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                    {career.description}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                    <ClipboardCheck className="w-5 h-5 text-primary" />
                                    Requirements
                                </h3>
                                <ul className="grid gap-4">
                                    {career.requirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group">
                                            <div className="h-2 w-2 rounded-full bg-primary mt-2.5 shrink-0 group-hover:scale-125 transition-transform" />
                                            <span className="text-slate-600 font-bold">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar info */}
                        <div className="space-y-6">
                            <div className="p-8 rounded-[32px] bg-slate-900 text-white space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Application Info</h4>
                                <p className="text-sm leading-relaxed text-slate-300 font-medium">
                                    Applications for this position are currently being sent to <span className="text-white font-bold underline decoration-primary underline-offset-4">teamlandschaft@gmail.com</span>.
                                </p>
                                <div className="h-[1px] bg-white/10" />
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Job ID</p>
                                    <p className="font-mono text-xs text-slate-400">{career.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
