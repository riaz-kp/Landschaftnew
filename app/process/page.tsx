import { Container } from "@/components/layout/container"
import { Search, PenTool, FileText, Shovel, Sprout } from "lucide-react"

const steps = [
    {
        icon: Search,
        title: "1. Discovery & Site Study",
        description: "We begin by listening—to you and the land. We analyze soil, topography, climate, and existing ecology to form a solid foundation for design.",
    },
    {
        icon: PenTool,
        title: "2. Concept & Master Planning",
        description: "Synthesizing our findings into a cohesive vision. We explore spatial arrangements, circulation, and planting strategies to create a master plan.",
    },
    {
        icon: FileText,
        title: "3. Detailed Design",
        description: "Refining the vision into actionable blueprints. We produce planting plans, construction details, and lighting layouts to ensure precision.",
    },
    {
        icon: Shovel,
        title: "4. Execution",
        description: "Our in-house team brings the drawings to life. From earthwork to hardscaping, we manage every detail to ensure the design intent is realized.",
    },
    {
        icon: Sprout,
        title: "5. Handover & Maintenance",
        description: "The garden begins its life. We guide you through the handover and offer ongoing maintenance to help the landscape evolve beautifully.",
    },
]

export default function ProcessPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="pt-32 pb-16 bg-background">
                <Container className="text-center">
                    <h1 className="text-4xl font-light text-foreground sm:text-5xl md:text-6xl">Our Process</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        A structured approach to creating timeless landscapes, reducing anxiety and ensuring excellence.
                    </p>
                </Container>
            </section>

            <section className="pb-24">
                <Container className="max-w-4xl">
                    <div className="relative border-l border-primary/20 ml-6 md:ml-12 space-y-12">
                        {steps.map((step) => (
                            <div key={step.title} className="relative pl-8 md:pl-16">
                                <span className="absolute -left-[13px] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-background border border-primary text-primary">
                                    <step.icon className="h-3.5 w-3.5" />
                                </span>
                                <h2 className="text-2xl font-light text-foreground">{step.title}</h2>
                                <p className="mt-2 text-lg text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    )
}
