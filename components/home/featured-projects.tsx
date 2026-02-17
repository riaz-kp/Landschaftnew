import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

const projects = [
    { id: 1, title: "Hillside Residence", location: "Calicut", type: "Residential" },
    { id: 2, title: "Urban Oasis", location: "Kochi", type: "Commercial" },
    { id: 3, title: "The Courtyard House", location: "Malappuram", type: "Residential" },
]

export function FeaturedProjects() {
    return (
        <section className="py-32 bg-background border-t border-neutral-200">
            <Container>
                <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-8">
                    <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl max-w-lg">
                        Selected <br className="hidden md:block" /> Works
                    </h2>
                    <Button variant="link" asChild className="hidden sm:inline-flex text-lg text-primary hover:text-foreground transition-colors p-0">
                        <Link href="/projects">View All Projects &rarr;</Link>
                    </Button>
                </div>

                <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
                    {projects.map((project, i) => (
                        <Link key={project.id} href={`/projects`} className={`group block ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                            <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100">
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 bg-neutral-200 transition-transform duration-700 ease-out group-hover:scale-105" />
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-2xl font-light italic">
                                    Project Photography
                                </div>
                                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                            </div>
                            <div className="mt-6 flex justify-between items-start border-b border-neutral-200 pb-4">
                                <div>
                                    <h3 className="text-2xl font-medium text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="mt-1 text-base text-muted-foreground">{project.location}</p>
                                </div>
                                <span className="text-sm uppercase tracking-widest text-muted-foreground pt-2">{project.type}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center sm:hidden">
                    <Button variant="outline" size="lg" asChild className="w-full rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background">
                        <Link href="/projects">View All Projects</Link>
                    </Button>
                </div>
            </Container>
        </section>
    )
}
