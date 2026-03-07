import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Tag } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { getProjects, getProjectBySlug } from "@/lib/data/projects"

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    const projects = await getProjects()
    return projects
        .filter(p => p.published !== false)
        .map((project) => ({
            slug: project.slug,
        }))
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project || project.published === false) {
        notFound()
    }

    return (
        <article className="flex flex-col min-h-screen">
            {/* Hero Image */}
            <div className="relative aspect-[4/3] md:aspect-auto md:h-[70vh] w-full bg-neutral-200 overflow-hidden">
                {/* Floating Back Button */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
                    <Button variant="outline" size="sm" asChild className="w-fit text-xs h-9 px-4 rounded-full bg-black/20 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white transition-all shadow-lg">
                        <Link href="/projects" className="flex items-center justify-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Projects
                        </Link>
                    </Button>
                </div>

                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-neutral-300" />
                )}
                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white bg-gradient-to-t from-black/80 to-transparent">
                    <Container>
                        <h1 className="text-4xl md:text-6xl font-light">{project.title}</h1>
                        <div className="mt-4 flex flex-wrap items-center gap-6 text-lg md:text-xl font-light opacity-90">
                            <span className="flex items-center gap-2">
                                <Tag className="w-5 h-5" />
                                {project.category}
                            </span>
                            {project.location && (
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    {project.location}
                                </span>
                            )}
                        </div>
                    </Container>
                </div>
            </div>

            <Container className="py-8 md:py-16">
                <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-20">
                    {/* Project Brief - Top on mobile, Sidebar on desktop */}
                    <div className="lg:order-2 space-y-6 lg:border-l lg:pl-12 h-fit lg:sticky lg:top-24">
                        {project.description && (
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-widest text-primary/80 hidden md:block">Project Brief</h3>
                                <div className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {project.description}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Gallery Grid - Below brief on mobile, Main on desktop */}
                    <div className="lg:order-1 space-y-8">
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-2xl font-light text-foreground">Gallery</h2>
                        </div>

                        {project.gallery && project.gallery.length > 0 && (
                            <section>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {project.gallery.map((img, i) => (
                                        <div key={i} className="aspect-[4/3] bg-neutral-100 rounded-lg overflow-hidden border">
                                            <img src={img} alt={`${project.title} gallery ${i}`} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </Container >
        </article >
    )
}
