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
                <div className="grid grid-cols-2 gap-px bg-border/40 overflow-hidden rounded-3xl shadow-lg md:grid-cols-4 border border-border/50">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-background p-6 sm:p-10 md:p-12 flex flex-col items-center justify-center text-center group transition-colors duration-500 hover:bg-primary/5"
                        >
                            <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-primary transition-all duration-500 group-hover:scale-110">
                                {stat.value}
                            </div>
                            <div className="mt-3 sm:mt-5 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors duration-500 max-w-[120px] md:max-w-none">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
