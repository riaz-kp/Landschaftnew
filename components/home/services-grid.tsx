import Link from "next/link"
import { ArrowRight, PenTool, Layers, Leaf, Droplets, Sun, Wrench } from "lucide-react"
import { Container } from "@/components/layout/container"

const services = [
    { title: "Design & Consulting", description: "Master planning and site analysis.", icon: PenTool },
    { title: "Hardscaping", description: "Patios, pathways, and structures.", icon: Layers },
    { title: "Softscaping", description: "Native planting and meadows.", icon: Leaf },
    { title: "Water Features", description: "Ponds, pools, and rain gardens.", icon: Droplets },
    { title: "Irrigation & Lighting", description: "Efficient systems and ambiance.", icon: Sun },
    { title: "Maintenance", description: "Seasonal care and plant health.", icon: Wrench },
]

export function ServicesGrid() {
    return (
        <section className="py-24 bg-background">
            <Container>
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl font-light text-foreground sm:text-4xl">Signature Services</h2>
                    <p className="mt-4 max-w-2xl text-muted-foreground">Comprehensive landscape solutions from concept to care.</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Link
                            key={service.title}
                            href="/services"
                            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm p-8 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            {/* Decorative Background Icon */}
                            <div className="absolute -right-6 -top-6 opacity-[0.03] transition-all duration-700 group-hover:scale-150 group-hover:opacity-[0.08] group-hover:-rotate-12 pointer-events-none">
                                <service.icon className="w-48 h-48 text-primary" />
                            </div>

                            <div className="relative z-10">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg">
                                    <service.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                            <div className="relative z-10 mt-10 flex items-center text-xs font-semibold uppercase tracking-wider text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}
