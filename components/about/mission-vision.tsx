import { Container } from "@/components/layout/container"

export function MissionVision() {
    return (
        <section className="py-24 bg-background">
            <Container>
                <div className="grid gap-12 md:grid-cols-2 lg:gap-24">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-light text-foreground sm:text-4xl">Our Mission</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            To transform outdoor spaces into living sanctuaries that honor the local ecology while elevating the human experience. We strive to create landscapes that are not just beautiful, but resilient and regenerative.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-3xl font-light text-foreground sm:text-4xl">Our Vision</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            A future where design and nature coexist seamlessly. We envision a world where every built environment is enriched by thoughtful, sustainable landscape architecture that stands the test of time.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}
