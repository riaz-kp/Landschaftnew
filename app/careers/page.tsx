import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getCareers } from "@/lib/data/careers"

export default async function CareersPage() {
    const careers = await getCareers()
    const publishedCareers = careers.filter(c => c.published)

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <section className="pt-32 pb-16 bg-background">
                <Container className="text-center">
                    <h1 className="text-4xl font-light text-foreground sm:text-5xl md:text-6xl">Build with Us</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        We are project-driven, design-focused, and always looking for talent that shares our passion for the landscape.
                    </p>
                </Container>
            </section>

            {/* Content Section */}
            <section className="pb-24">
                <Container className="max-w-5xl">
                    <div className="grid gap-8">
                        {publishedCareers.length > 0 ? (
                            publishedCareers.map((career) => (
                                <div
                                    key={career.id}
                                    className="group bg-white border border-slate-200 rounded-3xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                                                    {career.department}
                                                </span>
                                                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                                                    {career.type}
                                                </span>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-light text-foreground group-hover:text-primary transition-colors">
                                                    {career.title}
                                                </h2>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin className="h-4 w-4" />
                                                        {career.location}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="h-4 w-4" />
                                                        {new Date(career.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground line-clamp-2 max-w-2xl">
                                                {career.description}
                                            </p>
                                        </div>
                                        <Button asChild className="group/btn h-12 px-6 rounded-2xl">
                                            <Link href={`/careers/${career.id}`} className="flex items-center gap-2">
                                                View Position
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-900">No open positions</h3>
                                <p className="text-slate-500 mt-2">
                                    We don't have any openings at the moment, but we're always happy to hear from talented people.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-20 p-12 bg-primary text-primary-foreground rounded-[40px] text-center space-y-6">
                        <h2 className="text-3xl font-light">Spontaneous Application</h2>
                        <p className="max-w-xl mx-auto opacity-90 text-lg">
                            Don't see a role that fits? Send your portfolio and CV to <a href="mailto:teamlandschaft@gmail.com" className="font-bold underline">teamlandschaft@gmail.com</a> and we'll keep you in mind for future opportunities.
                        </p>
                        <Button variant="secondary" size="lg" className="h-14 px-8 rounded-full" asChild>
                            <a href="mailto:teamlandschaft@gmail.com">Send Application</a>
                        </Button>
                    </div>
                </Container>
            </section>
        </div>
    )
}
