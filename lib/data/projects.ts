import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/lib/models/Project";
import type { ProjectCategory } from "@/lib/project-categories";

export interface Project {
    _id?: string;
    slug: string;
    title: string;
    location: string;
    category: ProjectCategory;
    area: string;
    year: string;
    description: string;
    image: string;
    gallery: string[];
    featured?: boolean;
    published?: boolean;
    order?: number;
    createdAt?: string;
    updatedAt?: string;
}

export async function getProjects(): Promise<Project[]> {
    await dbConnect();
    // Admin-defined order first; projects never reordered fall back to newest first.
    const projects = await ProjectModel.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects)); // Ensure it's plain objects for Next.js
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    await dbConnect();
    const project = await ProjectModel.findOne({ slug }).lean();
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
}
