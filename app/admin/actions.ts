"use server"

import fs from "fs"
import path from "path"
import { writeFile } from "fs/promises"
import { revalidatePath } from "next/cache"
import { Project } from "@/lib/data/projects"

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

    const filename = Date.now() + "-" + file.name.replace(/\s+/g, '-');
    const uploadDir = path.join(process.cwd(), "public", "images");

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    return `/images/${filename}`;
}
