import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/layout/container"

const services = [
    { title: "Design & Consulting", description: "Master planning and site analysis.", image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772797727/home_service_design_eb6qre.png" },
    { title: "Hardscaping", description: "Patios, pathways, and structures.", image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772797727/home_service_hardscaping_l38z4w.png" },
    { title: "Softscaping", description: "Native planting and meadows.", image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772797727/home_service_softscaping_slm1hx.png" },
    { title: "Water Features", description: "Ponds, pools, and rain gardens.", image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772797727/home_service_water_zeh7wa.png" },
    { title: "Irrigation & Lighting", description: "Efficient systems and ambiance.", image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772797727/home_service_irrigation_ochtmu.png" },
    { title: "Maintenance", description: "Seasonal care and plant health.", image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772797727/home_service_maintenence_sjkhmm.png" },
]

export function ServicesGrid() {
    return (
        <section className="py-24 md:py-32 bg-background overflow-hidden relative">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">Expertise</span>
                        <h2 className="mt-3 text-3xl font-light text-foreground sm:text-4xl md:text-5xl">Signature Services</h2>
                    </div>
                    <p className="max-w-md text-muted-foreground text-lg font-light md:text-right">
                        Comprehensive landscape solutions from concept to care.
                    </p>
                </div>

                {/* Standard Grid layout across all devices */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Link
                            key={service.title}
                            href="/services"
                            className="group relative flex flex-col justify-between rounded-3xl bg-secondary/50 p-8 sm:p-10 hover:bg-primary transition-colors duration-500 overflow-hidden"
                        >
                            <div className="relative z-10 flex flex-col h-full min-h-[220px]">
                                <div className="mb-8 relative flex h-20 w-20 items-center justify-center rounded-full bg-background overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500 ring-4 ring-background/50 group-hover:ring-primary-foreground/20">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        sizes="80px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                                <div className="mt-auto pt-8 border-t border-border/50 group-hover:border-primary-foreground/20 transition-colors duration-500">
                                    <h3 className="text-2xl font-medium text-foreground group-hover:text-primary-foreground transition-colors duration-500">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3 text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-500">
                                        {service.description}
                                    </p>
                                </div>
                            </div>

                            {/* Explicit clickable button indicator */}
                            <div className="absolute top-8 right-8 sm:top-10 sm:right-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background group-hover:border-primary-foreground/30 group-hover:bg-primary-foreground/10 group-hover:text-primary-foreground transition-all duration-500 shadow-sm z-20">
                                <ArrowUpRight className="h-5 w-5 text-foreground group-hover:text-primary-foreground transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}
