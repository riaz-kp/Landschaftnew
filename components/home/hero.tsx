import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function Hero() {
    return (
        <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-muted/20">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 z-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover bg-center opacity-90" />
            <div className="absolute inset-0 z-0 bg-black/20" /> {/* Overlay for text readability */}

            <Container className="relative z-10 text-center text-white">
                <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl drop-shadow-md">
                    Crafting Living Landscapes That Endure
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg font-light tracking-wide sm:text-xl text-white/90 drop-shadow-sm">
                    Environmental Planning • Landscape Design • Execution
                </p>
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-primary hover:bg-white/90" asChild>
                        <Link href="/projects">View Projects</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white text-white hover:bg-white hover:text-primary bg-transparent backdrop-blur-sm" asChild>
                        <Link href="/contact">Book Consultation</Link>
                    </Button>
                </div>
            </Container>
        </section>
    )
}
