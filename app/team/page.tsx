import { Container } from "@/components/layout/container"
import { Founders } from "@/components/about/founders"
import { TeamStructure } from "@/components/about/team-structure"

export default function TeamPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="pt-32 pb-16 bg-background">
                <Container className="text-center">
                    <h1 className="text-4xl font-light text-foreground sm:text-5xl md:text-6xl">The Team</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        A collective of architects, planners, and horticulturists dedicated to the art of landscape.
                    </p>
                </Container>
            </section>

            <Founders />
            <TeamStructure />
        </div>
    )
}
