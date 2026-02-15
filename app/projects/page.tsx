"use client"

import { useState } from "react"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/data/projects"
import { cn } from "@/lib/utils"

const categories = ["All", "Residential", "Commercial", "Hospitality"]

export default function ProjectsPage() {
    const [filter, setFilter] = useState("All")

    const filteredProjects = projects.filter(project =>
        filter === "All" ? true : project.category === filter
    )

    return (
        <div className="flex flex-col min-h-screen">
            <section className="pt-32 pb-12 bg-background">
                <Container className="text-center">
                    <h1 className="text-4xl font-light text-foreground sm:text-5xl md:text-6xl">Our Projects</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        A selection of works where design meets ecology.
                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={filter === cat ? "default" : "outline"}
                                onClick={() => setFilter(cat)}
                                className="rounded-full px-6 transition-all duration-300"
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="pb-24">
                <Container>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project) => (
                            <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200">
                                    {/* Placeholder Image */}
                                    <div className="absolute inset-0 bg-neutral-300 transition-transform duration-700 ease-out group-hover:scale-105" />
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 text-xl font-light">
                                        {project.title}
                                    </div>

                                    {/* Image Overlay */}
                                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                                </div>
                                <div className="mt-5">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{project.category}</span>
                                    <h3 className="mt-2 text-xl font-medium text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="text-sm text-muted-foreground">{project.location}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}
