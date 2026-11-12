import mongoose, { Schema, Document, Model } from "mongoose";
import { PROJECT_CATEGORIES, type ProjectCategory } from "@/lib/project-categories";

export interface IProject extends Document {
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
}

const ProjectSchema: Schema = new Schema(
    {
        slug: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        location: { type: String, required: true },
        category: { type: String, enum: [...PROJECT_CATEGORIES], required: true },
        area: { type: String, required: true },
        year: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        gallery: [{ type: String }],
        featured: { type: Boolean, default: false },
        published: { type: Boolean, default: true },
        // Display position set from the admin "Reorder" view; lower comes first.
        order: { type: Number },
    },
    { timestamps: true }
);

const Project: Model<IProject> =
    mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
