import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Tag } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { getProjects, getProjectBySlug } from "@/lib/data/projects"
import {
    ImageLightboxProvider,
    ImageLightboxTrigger,
    type LightboxImage,
} from "@/components/projects/image-lightbox"
import { Metadata } from "next"

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) return {}

    return {
        title: `${project.title} | Landscape Projects`,
        description: project.description?.substring(0, 160) || `View details of our landscape design project: ${project.title}.`,
        openGraph: {
            title: project.title,
            description: project.description?.substring(0, 160),
            images: project.image ? [{ url: project.image }] : [],
        },
        alternates: {
            canonical: `/projects/${slug}`,
        },
    }
}

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

    const heroAlt = `Landscape design project: ${project.title} by Landschaft`
    const galleryAlt = (i: number) =>
        `${project.title} landscape architecture details - view ${i + 1} by Landschaft`

    // Hero first, then gallery; skip duplicates so each image appears once in the slideshow.
    const slides: LightboxImage[] = []
    if (project.image) slides.push({ src: project.image, alt: heroAlt })
    project.gallery?.forEach((src, i) => {
        if (src && !slides.some((s) => s.src === src)) slides.push({ src, alt: galleryAlt(i) })
    })

    return (
        <ImageLightboxProvider images={slides}>
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
                    <ImageLightboxTrigger
                        src={project.image}
                        label={`Open ${project.title} image slideshow`}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={project.image}
                            alt={heroAlt}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </ImageLightboxTrigger>
                ) : (
                    <div className="absolute inset-0 bg-neutral-300" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-black/30" />

                <div className="pointer-events-none absolute bottom-0 left-0 w-full p-8 md:p-16 text-white bg-gradient-to-t from-black/80 to-transparent">
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
                                        <ImageLightboxTrigger
                                            key={i}
                                            src={img}
                                            label={`Open image ${i + 1} of ${project.title} in slideshow`}
                                            className="group aspect-[4/3] w-full bg-neutral-100 rounded-lg overflow-hidden border"
                                        >
                                            <img src={img} alt={galleryAlt(i)} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                                        </ImageLightboxTrigger>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </Container >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CreativeWork",
                        "name": project.title,
                        "description": project.description,
                        "image": project.image,
                        "locationCreated": {
                            "@type": "Place",
                            "name": project.location
                        },
                        "creator": {
                            "@type": "Organization",
                            "name": "Landschaft"
                        }
                    })
                }}
            />
        </article >
        </ImageLightboxProvider>
    )
}
