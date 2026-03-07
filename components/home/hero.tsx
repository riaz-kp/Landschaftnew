import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function Hero() {
    return (
        <section className="relative flex min-h-[95vh] flex-col justify-center overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://res.cloudinary.com/dnsmrborw/image/upload/v1772708486/WhatsApp_Image_2026-01-07_at_19.36.18_vziqqg.jpg"
                    alt="Landschaft Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <Container className="relative z-10 text-center text-white">
                <h1 className="mx-auto max-w-5xl text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl text-balance leading-[1.1] sm:leading-[1.05]">
                    Crafting Living Landscapes That Endure
                </h1>
                <p className="mx-auto mt-8 max-w-2xl text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-white/50">
                    Environmental Planning <span className="mx-3 opacity-30">|</span> Landscape Design <span className="mx-3 opacity-30">|</span> Execution
                </p>
                <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                    <Button size="lg" variant="outline" className="h-14 px-10 text-xs sm:text-sm font-medium uppercase tracking-wider rounded-full border-white/50 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm" asChild>
                        <Link href="/projects">View Projects</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-10 text-xs sm:text-sm font-medium uppercase tracking-wider rounded-full border-white/30 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm" asChild>
                        <Link href="/contact">Book Consultation</Link>
                    </Button>
                </div>
            </Container>
        </section>
    )
}
