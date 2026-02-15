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
                        <div key={stat.label} className="text-center">
                            <div className="text-4xl font-light text-primary sm:text-5xl">{stat.value}</div>
                            <div className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
