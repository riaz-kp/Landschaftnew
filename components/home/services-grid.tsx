import Link from "next/link"

import { Container } from "@/components/layout/container"

const services = [
    { title: "Design & Consulting", description: "Master planning and site analysis." },
    { title: "Hardscaping", description: "Patios, pathways, and structures." },
    { title: "Softscaping", description: "Native planting and meadows." },
    { title: "Water Features", description: "Ponds, pools, and rain gardens." },
    { title: "Irrigation & Lighting", description: "Efficient systems and ambiance." },
    { title: "Maintenance", description: "Seasonal care and plant health." },
]

export function ServicesGrid() {
    return (
        <section className="py-24 bg-background">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-foreground/10 pb-6">
                    <h2 className="text-4xl font-light text-foreground sm:text-5xl lg:text-6xl max-w-lg">
                        Expertise
                    </h2>
                    <p className="mt-4 md:mt-0 max-w-sm text-lg text-muted-foreground text-right">
                        Comprehensive environmental planning from concept to execution.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {services.map((service, index) => (
                        <Link
                            key={service.title}
                            href="/services"
                            className="group flex flex-col justify-start"
                        >
                            <span className="text-sm font-mono text-muted-foreground mb-4">
                                {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <h3 className="text-3xl font-light text-foreground group-hover:text-primary transition-colors duration-300 mb-4">
                                {service.title}
                            </h3>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>

                            <div className="mt-6 w-12 h-[1px] bg-foreground/20 group-hover:w-full group-hover:bg-primary transition-all duration-500 ease-out" />
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}
