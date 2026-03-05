import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Briefcase, ClipboardCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getCareerById } from "@/lib/data/careers"
import { ApplicationForm } from "@/components/careers/application-form"
import { notFound } from "next/navigation"

export default async function CareerPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const career = await getCareerById(id)

    if (!career || !career.published) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <section className="pt-32 pb-24 bg-background">
                <Container className="max-w-6xl">
                    <Button variant="ghost" className="mb-8 hover:bg-slate-50 transition-colors rounded-full px-6" asChild>
                        <Link href="/careers" className="flex items-center gap-2 text-slate-500">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Careers
                        </Link>
                    </Button>
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                                {career.department}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                                {career.type}
                            </span>
                        </div>
                        <h1 className="text-4xl font-light text-foreground sm:text-5xl md:text-6xl max-w-4xl">
                            {career.title}
                        </h1>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5 font-medium">
                                <MapPin className="h-4 w-4 text-primary" />
                                {career.location}
                            </span>
                            <span className="flex items-center gap-1.5 font-medium">
                                <Clock className="h-4 w-4 text-primary" />
                                {new Date(career.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="pb-32">
                <Container className="max-w-6xl">
                    <div className="grid gap-16 lg:grid-cols-2">
                        {/* Job Description (Left Column) */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-light text-foreground border-b border-slate-100 pb-4 flex items-center gap-3">
                                    <Briefcase className="w-5 h-5 text-primary" />
                                    Job Description
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {career.description}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-2xl font-light text-foreground border-b border-slate-100 pb-4 flex items-center gap-3">
                                    <ClipboardCheck className="w-5 h-5 text-primary" />
                                    Key Requirements
                                </h2>
                                <ul className="space-y-4 text-lg text-muted-foreground">
                                    {career.requirements.map((req: string, index: number) => (
                                        <li key={index} className="flex items-start gap-4">
                                            <span className="h-2 w-2 rounded-full bg-primary mt-2.5 shrink-0" />
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Application Form (Right Column) */}
                        <div className="h-fit lg:sticky lg:top-32">
                            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200">
                                <div className="mb-10">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Apply Now</h3>
                                    <p className="text-slate-500 text-base leading-relaxed font-medium">
                                        Fill in the form below and upload your CV to start your journey with us.
                                    </p>
                                </div>
                                <ApplicationForm careerId={career.id} careerTitle={career.title} />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
