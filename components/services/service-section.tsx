import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ServiceSectionProps {
    title: string
    description: string
    features: string[]
    image: string
    id: string
    reversed?: boolean
}

export function ServiceSection({ title, description, features, image, id, reversed }: ServiceSectionProps) {
    return (
        <section id={id} className="py-24 border-b odd:bg-background even:bg-muted/30 last:border-0">
            <Container>
                <div className={cn("grid gap-12 lg:grid-cols-2 items-center", reversed ? "lg:grid-flow-row-dense" : "")}>
                    {/* Image Side */}
                    <div className={cn("relative aspect-[4/3] bg-neutral-200 rounded-lg overflow-hidden", reversed ? "lg:col-start-2" : "")}>
                        {/* Placeholder */}
                        <div className="absolute inset-0 bg-neutral-300" />
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-lg">
                            Image: {title}
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className={cn("flex flex-col gap-6", reversed ? "lg:col-start-1" : "")}>
                        <h2 className="text-3xl font-light text-foreground sm:text-4xl">{title}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2">
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <span className="text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </section>
    )
}
