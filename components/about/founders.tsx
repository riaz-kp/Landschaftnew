import Image from "next/image"
import { Container } from "@/components/layout/container"

const founders = [
    {
        name: "Ashfaq Rahman",
        role: "Founder & Managing Director",
        quote: "A good landscape is built through discipline, detail, and respect for how it will be used every day.",
        image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772707183/about-founder-ashfaq_rynhus.jpg"
    },
    {
        name: "Anees Jabaly",
        role: "Co-Founder & Design Director",
        quote: "Clarity in design creates landscapes that feel natural, purposeful, and timeless.",
        image: "https://res.cloudinary.com/dnsmrborw/image/upload/v1772707193/about-founder-anees_uackbl.jpg"
    }
]

export function Founders() {
    return (
        <section className="py-24 bg-background">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-light text-foreground sm:text-4xl">The Founders</h2>
                    <p className="mt-4 text-muted-foreground">The visionaries behind Landschaft.</p>
                </div>
                <div className="grid gap-12 md:grid-cols-2 lg:gap-24 max-w-5xl mx-auto">
                    {founders.map((founder) => (
                        <div key={founder.name} className="flex flex-col items-center text-center">
                            <div className="relative w-64 h-80 bg-neutral-100 rounded-lg overflow-hidden mb-8 transition-all duration-500">
                                <Image
                                    src={founder.image}
                                    alt={founder.name}
                                    fill
                                    className="object-cover"
                                    sizes="256px"
                                />
                                <div className="absolute inset-0 bg-neutral-900/10 hover:bg-transparent transition-colors duration-300" />
                            </div>
                            <h3 className="text-2xl font-medium text-foreground">{founder.name}</h3>
                            <p className="text-sm font-medium uppercase tracking-widest text-primary mt-2">{founder.role}</p>
                            <p className="mt-4 text-muted-foreground italic max-w-sm">"{founder.quote}"</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
