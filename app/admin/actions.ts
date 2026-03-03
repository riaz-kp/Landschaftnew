"use server"

import fs from "fs"
import path from "path"
import { revalidatePath } from "next/cache"
import { Project } from "@/lib/data/projects"
import cloudinary from "@/lib/cloudinary"

const dataFilePath = path.join(process.cwd(), "lib", "data", "projects.json")

function getProjects(): Project[] {
    if (!fs.existsSync(dataFilePath)) return []
    const fileContents = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(fileContents)
}

function saveProjects(projects: Project[]) {
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 4))
}

export async function addProject(project: Project) {
    const projects = getProjects()
    projects.push(project)
    saveProjects(projects)
    revalidatePath("/projects")
    revalidatePath("/admin")
    return { success: true }
}

export async function deleteProject(slug: string) {
    let projects = getProjects()
    projects = projects.filter(p => p.slug !== slug)
    saveProjects(projects)
    revalidatePath("/projects")
    revalidatePath("/admin")
    return { success: true }
}

export async function updateProject(updatedProject: Project) {
    let projects = getProjects()
    projects = projects.map(p => p.slug === updatedProject.slug ? updatedProject : p)
    saveProjects(projects)
    revalidatePath("/projects")
    revalidatePath("/admin")
    return { success: true }
}

export async function uploadImage(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) return null;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<string | null>((resolve, reject) => {
        // Double check environment variables are available
        if (!process.env.CLOUDINARY_API_KEY) {
            console.error("Missing CLOUDINARY_API_KEY in environment variables");
            resolve(null);
            return;
        }

        // Ensure configuration is applied with current process.env
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        cloudinary.uploader.upload_stream(
            {
                folder: "landschaft_project_images",
                resource_type: "auto"
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    resolve(null);
                } else {
                    resolve(result?.secure_url || null);
                }
            }
        ).end(buffer);
    });
}
