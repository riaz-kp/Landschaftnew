import { Container } from "@/components/layout/container"

export function PhilosophyFull() {
    return (
        <section className="py-32 bg-secondary/20">
            <Container className="text-center">
                <blockquote className="mx-auto max-w-4xl">
                    <p className="text-3xl font-light italic leading-relaxed text-foreground sm:text-4xl md:text-5xl">
                        "A garden is not an object to be viewed, but a process to be experienced. We believe landscape is living art—dynamic, ever-changing, and deeply connected to the rhythm of nature."
                    </p>
                </blockquote>
            </Container>
        </section>
    )
}
