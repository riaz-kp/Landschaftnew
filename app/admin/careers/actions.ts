"use server"

import { revalidatePath } from "next/cache"
import { Career as CareerType } from "@/lib/data/careers"
import dbConnect from "@/lib/mongodb"
import CareerModel from "@/lib/models/Career"

export async function addCareer(career: CareerType) {
    await dbConnect()
    await CareerModel.create(career)
    revalidatePath("/careers")
    revalidatePath("/admin/careers")
    return { success: true }
}

export async function deleteCareer(id: string) {
    await dbConnect()
    await CareerModel.deleteOne({ id })
    revalidatePath("/careers")
    revalidatePath("/admin/careers")
    return { success: true }
}

export async function updateCareer(updatedCareer: CareerType) {
    await dbConnect()
    await CareerModel.findOneAndUpdate({ id: updatedCareer.id }, updatedCareer)
    revalidatePath("/careers")
    revalidatePath("/admin/careers")
    return { success: true }
}
