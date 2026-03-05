import Link from "next/link"
import { ArrowRight } from "lucide-react"
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
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl font-light text-foreground sm:text-4xl">Signature Services</h2>
                    <p className="mt-4 max-w-2xl text-muted-foreground">Comprehensive landscape solutions from concept to care.</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Link
                            key={service.title}
                            href="/services"
                            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card p-8 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div>
                                <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="mt-2 text-muted-foreground">
                                    {service.description}
                                </p>
                            </div>
                            <div className="mt-8 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                Learn more <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}
