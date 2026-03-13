import { Container } from "@/components/layout/container"
import { MissionVision } from "@/components/about/mission-vision"
import { PhilosophyFull } from "@/components/about/philosophy-full"
import { Founders } from "@/components/about/founders"
import { TeamStructure } from "@/components/about/team-structure"
import { AboutSnapshot } from "@/components/home/about-snapshot"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Us | Our Design Philosophy & Team",
    description: "Learn about Landschaft, a design-led environmental planning studio in Kerala. Discover our mission, vision, and the team behind our sustainable landscape designs.",
    alternates: {
        canonical: "/about",
    },
}

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <section className="pt-32 pb-16 bg-background">
                <Container className="text-center">
                    <h1 className="text-4xl font-light text-foreground sm:text-5xl md:text-6xl">Who We Are</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        A design-led environmental planning studio with execution capabilities, redefining landscapes in Kerala and beyond.
                    </p>
                </Container>
            </section>

            <AboutSnapshot />
            {/* Wait, AboutSnapshot is for Home page. Let's stick to MissionVision here. */}

            <MissionVision />
            <PhilosophyFull />
            <Founders />
            <TeamStructure />
        </div>
    )
}


