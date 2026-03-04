import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Info, Plus } from "lucide-react"

export default function CareersAdminPage() {
    return (
        <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Careers & Openings</h1>
                    <p className="mt-2 text-slate-500 max-w-2xl">
                        Manage job listings and applications for your studio. (This feature is currently under development)
                    </p>
                </div>
                <Button className="shrink-0 gap-2 opacity-50 cursor-not-allowed">
                    <Plus className="w-4 h-4" />
                    New Position
                </Button>
            </div>

            <div className="grid gap-6">
                <Card className="border-dashed bg-slate-50/50">
                    <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                            <Briefcase className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Feature Coming Soon</h3>
                        <p className="text-slate-500 max-w-sm mt-1">
                            Soon you'll be able to post job openings, internships, and manage applications directly from here.
                        </p>
                    </CardContent>
                </Card>

                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-700">
                    <Info className="w-5 h-5 shrink-0" />
                    <div className="text-sm">
                        <p className="font-semibold">Note to Developer</p>
                        <p className="mt-1 opacity-90">
                            The careers module requires a separate data structure and possibly a backend integration for resume storage. This placeholder is ready for your future implementation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
