import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
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

const ProjectSchema: Schema = new Schema(
    {
        slug: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        location: { type: String, required: true },
        category: { type: String, enum: ["Residential", "Commercial"], required: true },
        area: { type: String, required: true },
        year: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        gallery: [{ type: String }],
        featured: { type: Boolean, default: false },
        published: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Project: Model<IProject> =
    mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
