import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/data/projects"
import { Image as ImageIcon, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

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

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {featuredProjects.map((project) => (
                                <Link key={project.slug} href={`/projects/${project.slug}`} className="group block h-full">
                                    <Card className="flex flex-col h-full overflow-hidden p-0 gap-0 rounded-2xl transition-all duration-300 hover:shadow-xl bg-card border-border hover:border-primary/40 group-hover:-translate-y-1">
                                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-200 shrink-0">
                                            {project.image && project.image !== "/placeholder.svg" ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50 text-lg font-light bg-muted transition-transform duration-700 group-hover:scale-105">
                                                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                                                    No Image
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>
                                        <CardHeader className="p-6">
                                            <CardTitle className="text-xl font-medium text-foreground transition-colors group-hover:text-primary leading-tight tracking-tight">
                                                {project.title}
                                            </CardTitle>
                                            <CardDescription className="text-sm text-muted-foreground/60 mt-2 font-light uppercase tracking-widest text-[10px]">
                                                {project.location} <span className="mx-1 opacity-30">•</span> {project.category}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="p-5 pt-0 mt-auto w-full">
                                            <div className="flex items-center w-full pt-4 border-t border-border/50">
                                                <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                                                    View Project
                                                </span>
                                                <div className="flex h-8 w-8 ml-auto items-center justify-center rounded-full bg-secondary/80 text-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md items-center justify-center">
                                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
                                                </div>
                                            </div>
                                        </CardFooter>
                                    </Card>
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
