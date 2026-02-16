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
        <section className="py-24 bg-secondary/20">
            <Container>
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">Portfolio</span>
                        <h2 className="mt-2 text-3xl font-light text-foreground sm:text-4xl">Featured Projects</h2>
                    </div>
                    <Button variant="ghost" asChild className="hidden sm:inline-flex">
                        <Link href="/projects">View All Projects</Link>
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Link key={project.id} href={`/projects`} className="group block">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200">
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 bg-neutral-300 transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 text-lg font-light">
                                    Project Image
                                </div>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-medium text-foreground">{project.title}</h3>
                                <p className="text-sm text-muted-foreground">{project.location} • {project.type}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center sm:hidden">
                    <Button variant="outline" asChild>
                        <Link href="/projects">View All Projects</Link>
                    </Button>
                </div>
            </Container>
        </section>
    )
}
