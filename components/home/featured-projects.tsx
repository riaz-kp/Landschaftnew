import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/data/projects"
import { Image as ImageIcon } from "lucide-react"

export async function FeaturedProjects() {
    const projects = await getProjects()
    const featuredProjects = projects.filter(p => p.featured && p.published !== false)

    return (
        <section className="py-24 bg-secondary/20">
            <Container>
                {featuredProjects.length > 0 ? (
                    <>
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">Portfolio</span>
                                <h2 className="mt-2 text-3xl font-light text-foreground sm:text-4xl">Featured Projects</h2>
                            </div>
                            <Button variant="ghost" asChild className="hidden sm:inline-flex">
                                <Link href="/projects">View All Projects</Link>
                            </Button>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {featuredProjects.map((project) => (
                                <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200">
                                        {project.image && project.image !== "/placeholder.svg" ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50 text-lg font-light bg-muted">
                                                <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-medium text-foreground">{project.title}</h3>
                                        <p className="text-sm text-muted-foreground">{project.location} • {project.category}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 text-center sm:hidden">
                            <Button variant="outline" asChild>
                                <Link href="/projects">View All Projects</Link>
                            </Button>
                        </div>
                    </>
                ) : null}
            </Container>
        </section>
    )
}
