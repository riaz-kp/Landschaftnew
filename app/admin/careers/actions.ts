"use server"

import fs from "fs"
import path from "path"
import { revalidatePath } from "next/cache"
import { Career } from "@/lib/data/careers"

const dataFilePath = path.join(process.cwd(), "lib", "data", "careers.json")

function getCareers(): Career[] {
    if (!fs.existsSync(dataFilePath)) return []
    const fileContents = fs.readFileSync(dataFilePath, "utf8")
    return JSON.parse(fileContents)
}

function saveCareers(careers: Career[]) {
    fs.writeFileSync(dataFilePath, JSON.stringify(careers, null, 4))
}

export async function addCareer(career: Career) {
    const careers = getCareers()
    careers.push(career)
    saveCareers(careers)
    revalidatePath("/careers")
    revalidatePath("/admin/careers")
    return { success: true }
}

export async function deleteCareer(id: string) {
    let careers = getCareers()
    careers = careers.filter(c => c.id !== id)
    saveCareers(careers)
    revalidatePath("/careers")
    revalidatePath("/admin/careers")
    return { success: true }
}

export async function updateCareer(updatedCareer: Career) {
    let careers = getCareers()
    careers = careers.map(c => c.id === updatedCareer.id ? updatedCareer : c)
    saveCareers(careers)
    revalidatePath("/careers")
    revalidatePath("/admin/careers")
    return { success: true }
}
