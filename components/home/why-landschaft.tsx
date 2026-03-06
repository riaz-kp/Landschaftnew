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
        <section className="py-24 bg-background">
            <Container>
                <div className="text-center mb-16 sm:mb-20">
                    <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-primary/80 uppercase">
                        Our Approach
                    </span>
                    <h2 className="mt-3 text-3xl font-light text-foreground sm:text-4xl lg:text-5xl leading-[1.2] text-balance">
                        Why Landschaft?
                    </h2>
                </div>
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {pillars.map((pillar) => (
                        <div key={pillar.title} className="flex flex-col items-center text-center group">
                            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                <pillar.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground leading-tight tracking-tight">{pillar.title}</h3>
                            <p className="mt-4 text-sm text-muted-foreground/60 leading-relaxed px-2">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
