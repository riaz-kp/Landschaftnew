import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function Hero() {
    return (
        <section className="relative flex h-screen flex-col justify-end pb-24 overflow-hidden">
            {/* Background Image - Priority Photography */}
            <div className="absolute inset-0 z-0 bg-neutral-900">
                <div className="absolute inset-0 bg-[url('/images/hero-placeholder.jpg')] bg-cover bg-center opacity-80" />
            </div>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <Container className="relative z-20 text-white">
                <div className="max-w-4xl">
                    <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl lg:text-9xl mb-6">
                        Living <br /> Landscapes.
                    </h1>
                    <p className="max-w-xl text-xl font-light tracking-wide text-white/90 mb-10">
                        We craft environments that breathe. A design-led environmental planning studio creating timeless, ecological spaces.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Button size="lg" className="h-14 px-10 text-lg rounded-none bg-white text-black hover:bg-neutral-200 transition-all duration-300" asChild>
                            <Link href="/projects">View Projects</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-none border-white text-white hover:bg-white hover:text-black bg-transparent transition-all duration-300" asChild>
                            <Link href="/contact">Book Consultation</Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}
