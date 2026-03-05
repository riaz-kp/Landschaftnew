import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function AboutSnapshot() {
    return (
        <section className="py-24 bg-muted/30">
            <Container className="grid gap-12 md:grid-cols-2 items-center">
                <div className="relative aspect-square md:aspect-[4/5] bg-neutral-100 rounded-lg overflow-hidden group">
                    <Image
                        src="https://res.cloudinary.com/dnsmrborw/image/upload/v1772708122/about-rooted-ecology_egleyi.jpg"
                        alt="Rooted in Ecology, Driven by Design"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                <div className="flex flex-col gap-6">
                    <h2 className="text-3xl font-light text-foreground sm:text-4xl">
                        Rooted in Ecology, Driven by Design.
                    </h2>
                    <ul className="space-y-4 text-lg text-muted-foreground">
                        <li className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Ecology-driven planning
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Precision in design execution
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Site-responsive architecture
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Residential & Commercial expertise
                        </li>
                    </ul>
                    <div className="pt-4">
                        {/* <Button variant="outline" size="lg" asChild>
                            <Link href="/about">More About Us</Link>
                        </Button> */}
                    </div>
                </div>
            </Container>
        </section>
    )
}
