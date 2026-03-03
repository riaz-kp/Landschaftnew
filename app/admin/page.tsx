import fs from "fs"
import path from "path"
import { Container } from "@/components/layout/container"
import { AdminDashboard } from "./admin-dashboard"
import { Project } from "@/lib/data/projects"

export default async function AdminPage() {
    const dataFilePath = path.join(process.cwd(), "lib", "data", "projects.json")
    let projects: Project[] = []

    if (fs.existsSync(dataFilePath)) {
        const fileContents = fs.readFileSync(dataFilePath, "utf8")
        projects = JSON.parse(fileContents)
    }

    return (
        <div className="pt-32 pb-24 bg-background min-h-screen">
            <Container>
                <div className="mb-12">
                    <h1 className="text-4xl font-light text-foreground sm:text-5xl">Admin Dashboard</h1>
                    <p className="mt-4 text-muted-foreground text-lg max-w-2xl">
                        Manage your projects directly from this panel. Changes are saved automatically.
                    </p>
                </div>
                <AdminDashboard initialProjects={projects} />
            </Container>
        </div>
    )
}
