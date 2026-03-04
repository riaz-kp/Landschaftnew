import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Tag } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/data/projects"

interface PageProps {
    params: {
        slug: string
    }
}

// Ensure correct type for params in Next.js 15+ if needed, but standard specificiation often works.
// Note: In Next.js 15, params is a Promise. But let's assume standard 14 conventions for now.
// If using Next 15, we need to await params.

export async function generateStaticParams() {
    return projects
        .filter(p => p.published !== false)
        .map((project) => ({
            slug: project.slug,
        }))
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)

    if (!project || project.published === false) {
        notFound()
    }

    return (
        <article className="flex flex-col min-h-screen">
            {/* Hero Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-neutral-200 overflow-hidden">
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
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary/80">Project Brief</h3>
                            <div className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {project.description}
                            </div>
                        </div>

                    </div>

                    {/* Gallery Grid - Below brief on mobile, Main on desktop */}
                    <div className="lg:order-1 space-y-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Button variant="outline" size="sm" asChild className="hidden lg:flex shrink-0">
                                <Link href="/projects" className="flex items-center gap-2">
                                    <ArrowLeft className="h-4 w-4" /> Back to Projects
                                </Link>
                            </Button>
                            <h2 className="text-2xl font-light text-foreground">Gallery</h2>
                        </div>

                        {/* Mobile Back Button - visible between Brief and Gallery on small screens */}
                        <div className="lg:hidden">
                            <Button variant="outline" size="sm" asChild className="w-full">
                                <Link href="/projects" className="flex items-center justify-center gap-2">
                                    <ArrowLeft className="h-4 w-4" /> Back to Projects
                                </Link>
                            </Button>
                        </div>

                        {project.gallery && project.gallery.length > 0 && (
                            <section>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {project.gallery.map((img, i) => (
                                        <div key={i} className="aspect-square bg-neutral-100 rounded-lg overflow-hidden border">
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
