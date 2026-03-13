import { Container } from "@/components/layout/container"
import { Search, PenTool, FileText, Shovel, Sprout } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Our Process | Discovery to Execution",
    description: "Learn about Landschaft's design and execution process. We follow a structured approach from discovery and site study to handover and long-term maintenance.",
    alternates: {
        canonical: "/process",
    },
}

const steps = [
    {
        icon: Search,
        title: "Discovery & Site Study",
        description: "We begin by listening—to you and the land. We analyze soil, topography, climate, and existing ecology to form a solid foundation for design.",
    },
    {
        icon: PenTool,
        title: "Concept & Master Planning",
        description: "Synthesizing our findings into a cohesive vision. We explore spatial arrangements, circulation, and planting strategies to create a master plan.",
    },
    {
        icon: FileText,
        title: "Detailed Design",
        description: "Refining the vision into actionable blueprints. We produce planting plans, construction details, and lighting layouts to ensure precision.",
    },
    {
        icon: Shovel,
        title: "Execution",
        description: "Our in-house team brings the drawings to life. From earthwork to hardscaping, we manage every detail to ensure the design intent is realized.",
    },
    {
        icon: Sprout,
        title: "Handover & Maintenance",
        description: "The garden begins its life. We guide you through the handover and offer ongoing maintenance to help the landscape evolve beautifully.",
    },
]

export default function ProcessPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="pt-40 pb-20 bg-background">
                <Container className="text-center">
                    <span className="text-[11px] font-semibold tracking-[0.3em] text-primary/60 uppercase">
                        Our Approach
                    </span>
                    <h1 className="mt-6 text-4xl font-light text-foreground sm:text-5xl md:text-6xl text-balance">
                        How We Work
                    </h1>
                    <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground/70 font-light leading-relaxed">
                        A clear, structured journey from the first site visit <br className="hidden sm:block" /> to the growing landscape.
                    </p>
                </Container>
            </section>

            <section className="pb-32">
                <Container className="max-w-4xl">
                    <div className="space-y-24 md:space-y-32 mt-12">
                        {steps.map((step, index) => (
                            <div key={step.title} className="grid md:grid-cols-[120px_1fr] gap-8 md:gap-16 items-start">
                                {/* Large Typographic Number */}
                                <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
                                    <span className="text-5xl md:text-6xl font-light text-primary/10 select-none">
                                        0{index + 1}
                                    </span>
                                    {/* <div className="h-px flex-1 md:w-8 bg-primary/20" /> */}
                                    <step.icon className="h-5 w-5 text-primary/40 md:mt-4" />
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-2xl font-medium text-foreground sm:text-3xl tracking-tight">
                                        {step.title}
                                    </h2>
                                    <p className="text-lg text-muted-foreground/80 leading-relaxed font-light max-w-2xl">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Subtle Footer Accent */}
            <section className="py-24 border-t border-primary/5">
                <Container className="text-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/20 mx-auto mb-12" />
                    <p className="text-sm font-medium tracking-widest text-primary/30 uppercase">
                        Landschaft Landscape Architecture
                    </p>
                </Container>
            </section>
        </div>
    )
}
