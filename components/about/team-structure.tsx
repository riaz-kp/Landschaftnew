import { Container } from "@/components/layout/container"
import { Ruler, ClipboardCheck, Hammer, Trees } from "lucide-react"

const departments = [
    {
        title: "Design Studio",
        description: "Architects and planners crafting the vision.",
        icon: Ruler,
    },
    {
        title: "Project Management",
        description: "Ensuring timelines and quality control.",
        icon: ClipboardCheck,
    },
    {
        title: "Execution Team",
        description: "Skilled craftsmen bringing designs to life.",
        icon: Hammer,
    },
    {
        title: "Horticulture Team",
        description: "Plant experts nurturing the living elements.",
        icon: Trees,
    },
]

export function TeamStructure() {
    return (
        <section className="py-24 bg-muted/30">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-light text-foreground sm:text-4xl">Our Structure</h2>
                    <p className="mt-4 text-muted-foreground">A unified team delivering excellence at every scale.</p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {departments.map((dept) => (
                        <div key={dept.title} className="bg-background p-8 rounded-lg border hover:border-primary/50 transition-colors flex flex-col items-center text-center">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/50 text-primary">
                                <dept.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground">{dept.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {dept.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
