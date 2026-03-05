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
                <p className="mx-auto mt-8 max-w-xl text-xl font-light text-primary-foreground/90">
                    Ready to transform your space into a living work of art?
                </p>
                <div className="mt-12">
                    <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300" asChild>
                        <Link href="/contact">Book Consultation</Link>
                    </Button>
                </div>
            </Container>
        </section>
    )
}
