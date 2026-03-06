import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function CTA() {
    return (
        <section className="py-24 md:py-40 bg-secondary/10 border-t border-secondary/20">
            <Container className="text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block text-primary/80 font-semibold uppercase tracking-[0.3em] text-[11px] sm:text-xs mb-10">
                        The Next Step
                    </span>
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-primary leading-[1.1] tracking-tight mb-12 text-balance">
                        Start Your Landscape <br className="hidden sm:block" />
                        <span className="italic font-light">Evolution</span>
                    </h2>
                    <p className="mx-auto max-w-xl text-lg lg:text-xl text-muted-foreground/60 mb-16 leading-relaxed px-4">
                        Ready to transform your space into a living work of art? Our studio combines design precision with ecological wisdom.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                        <Button
                            size="lg"
                            className="h-16 px-12 text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 w-full sm:w-auto font-medium"
                            asChild
                        >
                            <Link href="/contact">Book A Consultation</Link>
                        </Button>
                        <Link
                            href="/projects"
                            className="text-primary hover:text-secondary font-medium tracking-[0.2em] uppercase text-xs border-b border-primary/20 hover:border-secondary pb-1 transition-all"
                        >
                            Explore Portfolio
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}
