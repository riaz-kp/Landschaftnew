import { Container } from "@/components/layout/container"
import { getProjects } from "@/lib/data/projects"
import { ProjectList } from "@/components/projects/project-list"

export default async function ProjectsPage() {
    const projects = await getProjects()

    return (
        <div className="flex flex-col min-h-screen">
            <section className="pt-32 pb-12 bg-background">
                <Container className="text-center">
                    <h1 className="text-4xl font-light text-foreground sm:text-5xl md:text-6xl">Our Projects</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        A selection of works where design meets ecology.
                    </p>
                </Container>
            </section>

            <section className="pb-24">
                <Container>
                    <ProjectList initialProjects={projects} />
                </Container>
            </section>
        </div>
    )
}
