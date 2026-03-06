import { Container } from "@/components/layout/container"
import { Users, PenTool, Sprout, Layers } from "lucide-react"

const pillars = [
    {
        icon: Users,
        title: "It Starts With Your Story",
        description: "We listen deeply to understand your vision and lifestyle.",
    },
    {
        icon: PenTool,
        title: "Unified Design & Execution",
        description: "Seamless transition from paper to planting, all under one roof.",
    },
    {
        icon: Layers,
        title: "Seamless Client Access",
        description: "Transparent process and constant communication throughout.",
    },
    {
        icon: Sprout,
        title: "Purpose-Driven Planning",
        description: "Every element serves a function, both aesthetic and ecological.",
    },
]

export function WhyLandschaft() {
    return (
        <section className="py-24 bg-muted/20">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-light text-foreground sm:text-4xl">Why Landschaft?</h2>
                </div>
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {pillars.map((pillar) => (
                        <div key={pillar.title} className="flex flex-col items-center text-center">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm text-primary">
                                <pillar.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground">{pillar.title}</h3>
                            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
