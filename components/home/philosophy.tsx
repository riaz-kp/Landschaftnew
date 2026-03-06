import { Container } from "@/components/layout/container"

export function Philosophy() {
    return (
        <section className="py-32 md:py-40 bg-secondary/10 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] leading-none text-primary/5 font-serif italic pointer-events-none select-none">
                "
            </div>
            <Container className="text-center relative z-10">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-primary/80 uppercase">
                    Our Philosophy
                </span>
                <h2 className="mx-auto mt-10 max-w-4xl text-4xl font-light italic leading-[1.2] text-foreground sm:text-5xl md:text-6xl text-balance">
                    &ldquo;Landscape as Living Art&rdquo;
                </h2>
                <div className="mx-auto mt-12 h-px w-24 bg-primary/20" />
                <p className="mx-auto mt-12 max-w-2xl text-base sm:text-lg lg:text-xl font-light text-muted-foreground/70 leading-relaxed px-4">
                    We believe in crafting spaces that are not just visually stunning but ecologically vital.
                    Every garden is a dialogue between nature and design, created to endure and evolve.
                </p>
            </Container>
        </section>
    )
}
