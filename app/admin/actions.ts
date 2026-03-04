"use server"

import { revalidatePath } from "next/cache"
import { Project as ProjectType } from "@/lib/data/projects"
import dbConnect from "@/lib/mongodb"
import ProjectModel from "@/lib/models/Project"
import cloudinary from "@/lib/cloudinary"

export async function addProject(project: ProjectType) {
    await dbConnect()
    await ProjectModel.create(project)
    revalidatePath("/projects")
    revalidatePath("/admin")
    return { success: true }
}

export async function deleteProject(slug: string) {
    await dbConnect()
    await ProjectModel.deleteOne({ slug })
    revalidatePath("/projects")
    revalidatePath("/admin")
    return { success: true }
}

export async function updateProject(updatedProject: ProjectType) {
    await dbConnect()
    await ProjectModel.findOneAndUpdate({ slug: updatedProject.slug }, updatedProject)
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
