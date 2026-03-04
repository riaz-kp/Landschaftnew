import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICareer extends Document {
    id: string; // Original ID from JSON
    title: string;
    department: string;
    type: string;
    location: string;
    description: string;
    requirements: string[];
    published: boolean;
    createdAt: string;
}

const CareerSchema: Schema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        department: { type: String, required: true },
        type: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        requirements: [{ type: String }],
        published: { type: Boolean, default: true },
        // I specify createdAt as string to match current types, but Mongoose timestamps are better.
        // I'll keep compatibility by explicitly setting the createdAt if needed.
        createdAt: { type: String, required: true },
    },
    { timestamps: true }
);

const Career: Model<ICareer> =
    mongoose.models.Career || mongoose.model<ICareer>("Career", CareerSchema);

export default Career;
