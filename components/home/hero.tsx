import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function Hero() {
    return (
        <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-muted/20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://res.cloudinary.com/dnsmrborw/image/upload/v1772708486/WhatsApp_Image_2026-01-07_at_19.36.18_vziqqg.jpg"
                    alt="Landschaft Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 pointer-events-none" />
            </div>

            <Container className="relative z-10 text-center text-white">
                <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl drop-shadow-xl text-balance">
                    Crafting Living Landscapes That Endure
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg font-light tracking-wide sm:text-xl text-white/90 drop-shadow-sm">
                    Environmental Planning • Landscape Design • Execution
                </p>
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-primary hover:bg-white/90 shadow-lg hover:scale-105 transition-all duration-300" asChild>
                        <Link href="/projects">View Projects</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white text-white hover:bg-white hover:text-primary bg-transparent backdrop-blur-sm shadow-lg hover:scale-105 transition-all duration-300" asChild>
                        <Link href="/contact">Book Consultation</Link>
                    </Button>
                </div>
            </Container>
        </section>
    )
}
