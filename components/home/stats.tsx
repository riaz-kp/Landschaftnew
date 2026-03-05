import { Container } from "@/components/layout/container"

const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "60+", label: "Projects Completed" },
    { value: "50+", label: "Acres Designed" },
    { value: "90K+", label: "Plants Planted" },
]

export function Stats() {
    return (
        <section className="py-20 border-y bg-background">
            <Container>
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center group transition-transform duration-300 hover:-translate-y-2">
                            <div className="text-5xl font-light text-primary sm:text-6xl group-hover:text-foreground transition-colors duration-300">{stat.value}</div>
                            <div className="mt-4 text-sm font-medium uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors duration-300">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
