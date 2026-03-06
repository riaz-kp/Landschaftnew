import Image from "next/image"
import Link from "next/link"
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

                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Link
                            key={service.title}
                            href="/services"
                            className="group relative flex flex-row items-center justify-between rounded-3xl bg-secondary/50 p-6 sm:p-8 hover:bg-primary transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-primary-foreground/10 overflow-hidden gap-4"
                        >
                            <div className="relative z-10 flex flex-col flex-1">
                                <h3 className="text-lg sm:text-xl font-medium text-foreground group-hover:text-primary-foreground transition-colors duration-500">
                                    {service.title}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-500 leading-relaxed pr-2">
                                    {service.description}
                                </p>
                            </div>
                            <div className="relative z-10 shrink-0">
                                <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-background overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-500 group-hover:scale-105">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        sizes="(max-width: 640px) 64px, 80px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 mix-blend-multiply" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    )
}
