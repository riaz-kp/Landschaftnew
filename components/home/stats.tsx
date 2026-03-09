import { Container } from "@/components/layout/container"

const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "60+", label: "Projects Completed" },
    { value: "50+", label: "Acres Designed" },
    { value: "90K+", label: "Plants Planted" },
]

export function Stats() {
    return (
        <section className="py-16 md:py-28 bg-background relative z-10 w-full">
            <Container>
                <div className="grid grid-cols-2 gap-8 md:gap-12 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex flex-col items-center justify-center text-center group transition-transform duration-500 hover:-translate-y-1"
                        >
                            <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-primary transition-colors duration-500 group-hover:text-foreground leading-none">
                                {stat.value}
                            </div>
                            <div className="mt-4 sm:mt-5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/60 group-hover:text-primary transition-colors duration-500">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
