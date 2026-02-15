import { Container } from "@/components/layout/container"

export function Philosophy() {
    return (
        <section className="py-24 md:py-32 bg-background">
            <Container className="text-center">
                <span className="text-sm font-semibold uppercase tracking-widest text-primary/80">
                    Our Philosophy
                </span>
                <h2 className="mx-auto mt-8 max-w-3xl text-3xl font-light italic leading-relaxed text-foreground sm:text-4xl md:text-5xl">
                    "Landscape as Living Art"
                </h2>
                <p className="mx-auto mt-8 max-w-2xl text-lg font-light text-muted-foreground leading-relaxed">
                    We believe in crafting spaces that are not just visually stunning but ecologically vital.
                    Every garden is a dialogue between nature and design, created to endure and evolve.
                </p>
            </Container>
        </section>
    )
}
