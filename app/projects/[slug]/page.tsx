import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
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
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default function ProjectPage({ params }: PageProps) {
    const project = projects.find((p) => p.slug === params.slug)

    if (!project) {
        notFound()
    }

    return (
        <article className="flex flex-col min-h-screen">
            {/* Hero Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-neutral-200 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-300" />
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-4xl font-light">
                    {project.title} (Hero Image)
                </div>
                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white bg-gradient-to-t from-black/60 to-transparent">
                    <Container>
                        <h1 className="text-4xl md:text-6xl font-light">{project.title}</h1>
                        <p className="mt-2 text-lg md:text-xl font-light opacity-90">{project.category} • {project.location}</p>
                    </Container>
                </div>
            </div>

            <Container className="py-24">
                <div className="grid gap-16 lg:grid-cols-[1fr_300px] lg:gap-24">
                    <div className="space-y-8">
                        <h2 className="text-2xl font-light text-foreground">Concept & Design</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                            {project.description}
                            {"\n\n"}
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>

                        {/* Gallery Grid placeholder */}
                        <div className="mt-12 grid gap-4 sm:grid-cols-2">
                            <div className="aspect-square bg-neutral-100 rounded-lg" />
                            <div className="aspect-square bg-neutral-100 rounded-lg" />
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8 lg:border-l lg:pl-12 h-fit lg:sticky lg:top-24">
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary/80">Project Details</h3>
                            <dl className="mt-6 space-y-4 text-sm">
                                <div>
                                    <dt className="font-medium text-foreground">Location</dt>
                                    <dd className="text-muted-foreground">{project.location}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-foreground">Year</dt>
                                    <dd className="text-muted-foreground">{project.year}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-foreground">Site Area</dt>
                                    <dd className="text-muted-foreground">{project.area}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-foreground">Scope</dt>
                                    <dd className="text-muted-foreground">Master Planning, Landscape Design</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="pt-8 border-t">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary/80 mb-4">Materials Palette</h3>
                            <div className="flex gap-2 flex-wrap">
                                <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">Laterite</span>
                                <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">Granite</span>
                                <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">River Pebble</span>
                            </div>
                        </div>

                        <div className="pt-12">
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/projects" className="flex items-center justify-center gap-2">
                                    <ArrowLeft className="h-4 w-4" /> Back to Projects
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </article>
    )
}
