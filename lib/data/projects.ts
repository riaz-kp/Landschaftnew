import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/lib/models/Project";

export interface Project {
    _id?: string;
    slug: string;
    title: string;
    location: string;
    category: "Residential" | "Commercial";
    area: string;
    year: string;
    description: string;
    image: string;
    gallery: string[];
    featured?: boolean;
    published?: boolean;
}

export async function getProjects(): Promise<Project[]> {
    await dbConnect();
    const projects = await ProjectModel.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects)); // Ensure it's plain objects for Next.js
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    await dbConnect();
    const project = await ProjectModel.findOne({ slug }).lean();
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
}
