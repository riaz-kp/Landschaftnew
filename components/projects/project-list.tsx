"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Project } from "@/lib/data/projects"

const categories = ["All", "Residential", "Commercial"]

export function ProjectList({ initialProjects }: { initialProjects: Project[] }) {
    const [filter, setFilter] = useState("All")

    const filteredProjects = initialProjects.filter(project => {
        const matchesCategory = filter === "All" ? true : project.category === filter
        const isPublished = project.published !== false
        return matchesCategory && isPublished
    })

    return (
        <div className="flex flex-col">
            <div className="mb-12 flex flex-wrap justify-center gap-4">
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

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                    <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-200">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-neutral-300 transition-transform duration-700 ease-out group-hover:scale-105" />
                            )}
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
        </div>
    )
}
