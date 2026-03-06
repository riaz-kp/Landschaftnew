import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function CTA() {
    return (
        <section className="py-24 md:py-40 bg-background border-t border-secondary/20">
            <Container className="text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block text-accent font-semibold uppercase tracking-[0.3em] text-[10px] mb-8">
                        The Next Step
                    </span>
                    <h2 className="text-4xl md:text-7xl font-light text-primary leading-[1.05] tracking-tight mb-10">
                        Start Your Landscape <br />
                        <span className="italic font-normal serif">Evolution</span>
                    </h2>
                    <p className="mx-auto max-w-xl text-lg text-muted-foreground mb-16 leading-relaxed">
                        Ready to transform your space into a living work of art? Our studio combines design precision with ecological wisdom.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <Button
                            size="lg"
                            className="h-16 px-12 text-lg rounded-none shadow-sm hover:shadow-xl transition-all duration-500 w-full sm:w-auto"
                            asChild
                        >
                            <Link href="/contact">Book A Consultation</Link>
                        </Button>
                        <Link
                            href="/projects"
                            className="text-primary hover:text-accent font-medium tracking-widest uppercase text-xs border-b border-primary/20 hover:border-accent pb-1 transition-all"
                        >
                            Explore Portfolio
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}
