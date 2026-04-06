import { Container } from "@/components/layout/container"
import { ServiceSection } from "@/components/services/service-section"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Landscape Services | Design, Hardscaping & Maintenance",
    description: "Explore our comprehensive landscape architecture services in Kerala. From master planning and hardscaping to softscaping and long-term maintenance.",
    alternates: {
        canonical: "/services",
    },
}

const services = [
    {
        id: "design",
        title: "Design & Consulting",
        description: "Our design process is rooted in a deep understanding of the site's ecology and your lifestyle. We move from broad conceptual master planning to intricate planting details.",
        features: ["Site analysis & Ecology study", "Concept development", "Master planning", "Planting design", "Working drawings"],
        image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1773048879/service-palnning_lvmv9n.png"
    },
    {
        id: "hardscape",
        title: "Hardscaping",
        description: "The backbone of your landscape. We use natural materials and precise craftsmanship to build enduring structures that define spaces and guide movement.",
        features: ["Patios & Terraces", "Pathways & Walkways", "Retaining walls", "Outdoor structures (Pergolas, Gazebos)"],
        image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772710486/service-hardscapping_q9jxzm.png"
    },
    {
        id: "softscape",
        title: "Softscaping",
        description: "The living element. We curate plant palettes that thrive in the local climate, creating lush, resilient gardens that change beautifully with the seasons.",
        features: ["Native planting schemes", "Meadow gardens", "Ecological restoration", "Seasonal color design"],
        image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772710975/service-softscapping_bnyjfj.png"
    },
    {
        id: "water",
        title: "Water Features",
        description: "Water brings life, sound, and movement. From tranquil koi ponds to architectural fountains, we integrate water elements that cool the air and calm the mind.",
        features: ["Natural Ponds", "Swimming Pools", "Architectural Fountains", "Rain gardens & Bioswales"],
        image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772711311/service-water_aiqzm8.png"
    },
    {
        id: "irrigation",
        title: "Irrigation & Lighting",
        description: "Technical systems that ensure your garden's health and usability day and night. Smart, efficient, and subtle.",
        features: ["Water-efficient drip systems", "Smart controllers", "Subtle architectural lighting", "Path & Security lighting"],
        image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772711590/service-light_kqzksi.png"
    },
    {
        id: "maintenance",
        title: "Maintenance & AMC",
        description: "A garden is a living system that requires consistent care. We offer robust Annual Maintenance Contracts (AMC), with all new installations receiving one month of complimentary service.",
        features: ["Seasonal pruning & care", "1 Month Free Maintenance", "Annual Maintenance Contracts", "Plant health management"],
        image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772711826/service-monitoring_osq8o0.jpg"
    }
]

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Services Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "itemListElement": services.map((service, index) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "item": {
                                "@type": "Service",
                                "name": service.title,
                                "description": service.description,
                                "provider": {
                                    "@type": "Organization",
                                    "name": "Landschaft",
                                    "url": "https://landschaft.in"
                                },
                                "image": service.image,
                                "areaServed": "Kerala"
                            }
                        }))
                    })
                }}
            />

            <section className="pt-32 pb-16 bg-background">
                <Container className="text-center">
                    <h1 className="text-4xl font-light text-foreground sm:text-5xl md:text-6xl">Our Services</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        From initial concept to long-term care, we offer a holistic approach to landscape architecture and execution.
                    </p>
                </Container>
            </section>

            {services.map((service, index) => (
                <ServiceSection
                    key={service.id}
                    {...service}
                    reversed={index % 2 !== 0}
                />
            ))}
        </div>
    )
}
