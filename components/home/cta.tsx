import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function CTA() {
    return (
        <section className="py-24 bg-primary text-primary-foreground">
            <Container className="text-center">
                <h2 className="mx-auto max-w-2xl text-3xl font-light sm:text-4xl">
                    Let’s Create Something Exceptional Together
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
                    Ready to transform your space into a living work of art?
                </p>
                <div className="mt-10">
                    <Button size="lg" variant="secondary" className="h-14 px-8 text-lg rounded-full" asChild>
                        <Link href="/contact">Book Consultation</Link>
                    </Button>
                </div>
            </Container>
        </section>
    )
}
