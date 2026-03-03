import projectsData from "./projects.json"

export interface Project {
    slug: string
    title: string
    location: string
    category: "Residential" | "Commercial"
    area: string
    year: string
    description: string
    image: string
    gallery: string[]
    featured?: boolean
}

export const projects: Project[] = projectsData as Project[]

