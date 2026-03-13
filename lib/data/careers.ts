import dbConnect from "@/lib/mongodb";
import CareerModel from "@/lib/models/Career";

export interface Career {
    _id?: string;
    id: string;
    title: string;
    department: string;
    type: string;
    location: string;
    description: string;
    requirements: string[];
    published: boolean;
    createdAt: string;
    updatedAt?: string;
}

export async function getCareers(): Promise<Career[]> {
    await dbConnect();
    const careers = await CareerModel.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(careers));
}

export async function getCareerById(id: string): Promise<Career | null> {
    await dbConnect();
    const career = await CareerModel.findOne({ id }).lean();
    if (!career) return null;
    return JSON.parse(JSON.stringify(career));
}
