"use server"

import { revalidatePath } from "next/cache"
import { Project as ProjectType } from "@/lib/data/projects"
import dbConnect from "@/lib/mongodb"
import ProjectModel from "@/lib/models/Project"
import cloudinary from "@/lib/cloudinary"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

// The home page, Projects page, project detail pages and sitemap are prerendered at
// build time, so refresh them after any change or they keep showing old data until the next deploy.
function revalidateProjectPages(slug?: string) {
    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/sitemap.xml")
    revalidatePath("/admin")
    if (slug) revalidatePath(`/projects/${slug}`)
}

// Projects created before ordering existed have no `order`. Give every project an
// explicit position (matching what is shown today) so new ones can be placed reliably.
async function backfillProjectOrder() {
    const hasUnordered = await ProjectModel.exists({ order: null }) // matches missing or null
    if (!hasUnordered) return
    const projects = await ProjectModel.find({}).sort({ order: 1, createdAt: -1 }).select("_id").lean()
    await ProjectModel.bulkWrite(
        projects.map((p, index) => ({
            updateOne: { filter: { _id: p._id }, update: { $set: { order: index } } },
        }))
    )
}

export async function addProject(project: ProjectType) {
    const session = await getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }
    await dbConnect()
    await backfillProjectOrder()
    // New projects go to the top of the list; the admin can move them afterwards.
    const first = await ProjectModel.findOne({}).sort({ order: 1 }).select("order").lean()
    const order = typeof first?.order === "number" ? first.order - 1 : 0
    await ProjectModel.create({ ...project, order })
    revalidateProjectPages(project.slug)
    return { success: true }
}

export async function deleteProject(slug: string) {
    const session = await getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }
    await dbConnect()
    await ProjectModel.deleteOne({ slug })
    revalidateProjectPages(slug)
    return { success: true }
}

export async function updateProject(updatedProject: ProjectType) {
    const session = await getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }
    await dbConnect()
    // Position is only changed through reorderProjects, so a stale copy can't undo a reorder.
    const update: Partial<ProjectType> = { ...updatedProject }
    delete update.order
    await ProjectModel.findOneAndUpdate({ slug: updatedProject.slug }, update)
    revalidateProjectPages(updatedProject.slug)
    return { success: true }
}

export async function reorderProjects(slugs: string[]) {
    const session = await getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }
    if (!Array.isArray(slugs) || slugs.some(slug => typeof slug !== "string")) {
        throw new Error("Invalid project order")
    }
    await dbConnect()

    const existing = await ProjectModel.find({}).sort({ order: 1, createdAt: -1 }).select("slug").lean()
    const known = new Set(existing.map(p => p.slug))
    const ordered = [...new Set(slugs)].filter(slug => known.has(slug))
    // Anything not in the submitted list (e.g. added in another tab meanwhile) keeps its relative place at the end.
    const placed = new Set(ordered)
    const finalOrder = [...ordered, ...existing.map(p => p.slug).filter(slug => !placed.has(slug))]

    await ProjectModel.bulkWrite(
        finalOrder.map((slug, index) => ({
            updateOne: { filter: { slug }, update: { $set: { order: index } } },
        }))
    )
    revalidateProjectPages()
    return { success: true }
}

export async function uploadImage(formData: FormData) {
    const session = await getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }
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
