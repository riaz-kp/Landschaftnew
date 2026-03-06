import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Leaf } from "lucide-react"

export function AboutSnapshot() {
    return (
        <section className="pt-8 pb-16 md:pt-20 md:pb-24 bg-background">
            <Container className="grid gap-10 md:gap-16 md:grid-cols-2 items-center">
                <div className="w-full max-w-[360px] sm:max-w-[400px] md:max-w-md lg:max-w-[460px] mx-auto md:mx-0">
                    <div className="relative aspect-[4/5] bg-neutral-100 rounded-3xl overflow-hidden group shadow-2xl">
                        <Image
                            src="https://res.cloudinary.com/dnsmrborw/image/upload/v1772708122/about-rooted-ecology_egleyi.jpg"
                            alt="Rooted in Ecology, Driven by Design"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:pl-10">
                    <span className="text-sm font-medium tracking-widest text-primary uppercase">
                        About Landschaft
                    </span>
                    <h2 className="text-3xl font-light text-foreground sm:text-4xl xl:text-5xl leading-tight">
                        Rooted in Ecology, <br className="hidden sm:block" /> Driven by Design.
                    </h2>
                    <ul className="space-y-6 text-base md:text-lg text-muted-foreground mt-4">
                        <li className="flex items-start gap-4">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Leaf className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span>Ecology-driven planning</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Leaf className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span>Precision in design execution</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Leaf className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span>Site-responsive architecture</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Leaf className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span>Residential & Commercial expertise</span>
                        </li>
                    </ul>
                    <div className="pt-2">
                        {/* <Button variant="outline" size="lg" asChild>
                            <Link href="/about">More About Us</Link>
                        </Button> */}
                    </div>
                </div>
            </Container>
        </section>
    )
}
