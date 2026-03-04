import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Project from "../lib/models/Project";
import Career from "../lib/models/Career";

dotenv.config({ path: ".env.local" });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in .env or .env.local");
    process.exit(1);
}

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // Seed Projects
        const projectsPath = path.join(process.cwd(), "lib", "data", "projects.json");
        if (fs.existsSync(projectsPath)) {
            const projectsData = JSON.parse(fs.readFileSync(projectsPath, "utf-8"));
            console.log(`Found ${projectsData.length} projects to seed.`);

            for (const project of projectsData) {
                await Project.findOneAndUpdate({ slug: project.slug }, project, {
                    upsert: true,
                    new: true,
                });
            }
            console.log("Projects seeded successfully.");
        }

        // Seed Careers
        const careersPath = path.join(process.cwd(), "lib", "data", "careers.json");
        if (fs.existsSync(careersPath)) {
            const careersData = JSON.parse(fs.readFileSync(careersPath, "utf-8"));
            console.log(`Found ${careersData.length} careers to seed.`);

            for (const career of careersData) {
                await Career.findOneAndUpdate({ id: career.id }, career, {
                    upsert: true,
                    new: true,
                });
            }
            console.log("Careers seeded successfully.");
        }

        console.log("Seeding complete!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
}

seed();
