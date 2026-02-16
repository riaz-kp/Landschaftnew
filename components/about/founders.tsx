import { Container } from "@/components/layout/container"

const founders = [
    {
        name: "Ashfaq Rahman",
        role: "Founder & Managing Director",
        quote: "A good landscape is built through discipline, detail, and respect for how it will be used every day.",
        image: "/images/ashfaq.jpg" // Placeholder
    },
    {
        name: "Anees Jabaly",
        role: "Co-Founder & Design Director",
        quote: "Clarity in design creates landscapes that feel natural, purposeful, and timeless.",
        image: "/images/anees.jpg" // Placeholder
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
                            <div className="relative w-64 h-80 bg-neutral-200 rounded-lg overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Image Placeholder */}
                                <div className="absolute inset-0 bg-neutral-300" />
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    {founder.name}
                                </div>
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
