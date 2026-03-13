import { MetadataRoute } from 'next'
import { getProjects } from '@/lib/data/projects'
import { getCareers } from '@/lib/data/careers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://landschaft.in'

    // Static routes
    const routes = [
        '',
        '/about',
        '/services',
        '/process',
        '/projects',
        '/careers',
        '/contact',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic projects
    const projects = await getProjects()
    const projectEntries = projects
        .filter((project) => project.published !== false)
        .map((project) => ({
            url: `${baseUrl}/projects/${project.slug}`,
            lastModified: new Date(project.updatedAt || new Date()),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))

    // Dynamic careers
    const careers = await getCareers()
    const careerEntries = careers
        .filter((career) => career.published)
        .map((career) => ({
            url: `${baseUrl}/careers/${career.id}`,
            lastModified: new Date(career.updatedAt || career.createdAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.5,
        }))

    return [...routes, ...projectEntries, ...careerEntries]
}
