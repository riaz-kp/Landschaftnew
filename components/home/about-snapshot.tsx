import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Leaf } from "lucide-react"

export function AboutSnapshot() {
    return (
        <section className="relative bg-background overflow-hidden flex flex-col md:flex-row">
            {/* Image section with bleed and fade */}
            <div className="w-full md:absolute md:inset-y-0 md:left-0 md:w-[60%] lg:w-[50%] h-[400px] sm:h-[450px] md:h-auto relative">
                <Image
                    src="https://res.cloudinary.com/dnsmrborw/image/upload/v1772708122/about-rooted-ecology_egleyi.jpg"
                    alt="Rooted in Ecology, Driven by Design"
                    fill
                    className="object-cover object-bottom"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                />

                {/* Narrower smooth horizontal fade for PC to reveal more image without boundary */}
                <div className="absolute inset-y-0 right-0 w-[40%] max-w-[300px] bg-gradient-to-r from-transparent via-background/60 to-background hidden md:block" />

                {/* Smooth vertical fade for mobile */}
                <div className="absolute inset-x-0 bottom-0 h-[30%] max-h-[150px] bg-gradient-to-t from-background via-background/70 to-transparent md:hidden" />
            </div>

            <Container className="relative z-10 w-full pt-8 pb-12 md:py-20 grid md:grid-cols-12 md:min-h-[500px] lg:min-h-[550px] items-center">
                {/* Empty column */}
                <div className="hidden md:block md:col-span-6 lg:col-span-6" />

                {/* Text content - adjusted spacing to match */}
                <div className="flex flex-col gap-4 md:col-span-6 lg:col-span-6 md:pl-8 lg:pl-16">
                    <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-primary/80 uppercase">
                        About Landschaft
                    </span>
                    <h2 className="text-2xl font-light text-foreground sm:text-3xl lg:text-4xl leading-[1.2] text-balance">
                        Rooted in Ecology, <br className="hidden sm:block" /> Driven by Design.
                    </h2>
                    <ul className="space-y-3.5 text-sm sm:text-base text-muted-foreground/80 mt-1">
                        <li className="flex items-start gap-4">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Leaf className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="leading-relaxed">Ecology-driven planning</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Leaf className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="leading-relaxed">Precision in design execution</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Leaf className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="leading-relaxed">Site-responsive architecture</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Leaf className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span className="leading-relaxed">Residential & Commercial expertise</span>
                        </li>
                    </ul>
                </div>
            </Container>
        </section>
    )
}
