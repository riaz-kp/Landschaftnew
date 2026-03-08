import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/data/projects"
import { Image as ImageIcon, ArrowRight } from "lucide-react"


export async function FeaturedProjects() {
    const projects = await getProjects()
    const featuredProjects = projects.filter(p => p.featured && p.published !== false)

    return (
        <section className="py-24 bg-background">
            <Container>
                {featuredProjects.length > 0 ? (
                    <>
                        <div className="flex items-end justify-between mb-12 sm:mb-16">
                            <div>
                                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-primary/80 uppercase">
                                    Portfolio
                                </span>
                                <h2 className="mt-3 text-3xl font-light text-foreground sm:text-4xl lg:text-5xl leading-[1.2] text-balance">
                                    Featured Projects
                                </h2>
                            </div>
                            <Button variant="ghost" asChild className="hidden sm:inline-flex group h-12 px-6 text-sm font-medium uppercase tracking-widest">
                                <Link href="/projects">
                                    View All Projects
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid gap-8 md:gap-x-8 md:gap-y-12 md:grid-cols-2 lg:grid-cols-4">
                            {featuredProjects.map((project) => (
                                <Link key={project.slug} href={`/projects/${project.slug}`} className="group block h-full">
                                    <div className="relative flex flex-col h-full bg-transparent transition-all duration-500">
                                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 shrink-0">
                                            {project.image && project.image !== "/placeholder.svg" ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-muted/30 transition-transform duration-1000 group-hover:scale-105">
                                                    <ImageIcon className="w-8 h-8 opacity-20" />
                                                </div>
                                            )}

                                            {/* Overlay gradient */}
                                            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                                            {/* Minimal Category on Image */}
                                            {project.category && (
                                                <div className="absolute top-4 left-4 z-10">
                                                    <span className="inline-flex items-center rounded-full bg-black/20 backdrop-blur-md border border-white/20 px-3 py-1 text-[10px] md:px-2.5 md:py-0.5 md:text-[8px] font-medium tracking-[0.2em] uppercase text-white shadow-lg">
                                                        {project.category}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Always Visible Clickable Arrow on Image */}
                                            <div className="absolute bottom-4 right-4 z-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                                                <div className="flex h-10 w-10 md:h-8 md:w-8 items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white shadow-lg group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all">
                                                    <ArrowRight className="h-4 w-4 md:h-3 md:w-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-5 flex flex-col flex-1">
                                            <h3 className="text-lg lg:text-xl font-medium text-foreground leading-tight tracking-tight transition-colors group-hover:text-primary">
                                                {project.title}
                                            </h3>
                                            {project.location && (
                                                <div className="mt-3 flex items-center gap-3">
                                                    <span className="w-8 h-[1px] bg-primary/30"></span>
                                                    <p className="text-xs text-muted-foreground/80 font-medium uppercase tracking-[0.15em]">
                                                        {project.location}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 text-center sm:hidden">
                            <Button variant="outline" asChild className="group rounded-full">
                                <Link href="/projects">
                                    View All Projects
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </>
                ) : null}
            </Container>
        </section>
    )
}
