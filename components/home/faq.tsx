import { Container } from "@/components/layout/container"
import { Accordion } from "@/components/ui/accordion"

export const faqItems = [
    {
        question: "How does your design-build process work?",
        answer: "Our integrated process spans three phases: Discovery, Design, and Construction. We handle everything from initial 3D concepts to final planting, ensuring a seamless transition from vision to reality.",
    },
    {
        question: "How long does a landscaping project take?",
        answer: "Design typically takes 4–8 weeks, while construction can range from 3 weeks for small gardens to 3–6 months for large estates. We provide a specific project timeline during the planning phase.",
    },
    {
        question: "Why choose a design-build firm?",
        answer: "As a design-build firm, we manage both creative design and physical construction. This unified approach ensures higher quality control, better budget management, and single-point accountability.",
    },
    {
        question: "What is the typical cost of your services?",
        answer: "Costs vary based on scope and materials. During our initial consultation, we provide transparent budget frameworks tailored to your property goals and investment priorities.",
    },
    {
        question: "Is your landscaping low-maintenance and sustainable?",
        answer: "Yes. We focus on nature-led, ecological designs using native plants and smart irrigation. Our goal is to create resilient ecosystems that thrive with minimal intervention.",
    },
    {
        question: "What areas do you serve?",
        answer: "We primarily serve Kerala, with hubs in Calicut and Malappuram. For high-end residential or large-scale consultancy work, we are available for projects across the region.",
    },
    {
        question: "Do you offer maintenance services?",
        answer: "Yes, Landschaft provides comprehensive Annual Maintenance Contracts (AMC). Every new installation includes one month of free maintenance, followed by flexible annually paid maintenance packages.",
    },
]

export function FAQ() {
    return (
        <section id="faq" className="py-24 bg-background border-t border-border/50">
            <Container>
                <div className="flex flex-col items-center">
                    <h2 className="mb-12 text-3xl font-light text-foreground sm:text-4xl lg:text-5xl leading-[1.2] text-center tracking-tight">
                        FAQs
                    </h2>
                    <Accordion items={faqItems} className="w-full max-w-3xl" />
                </div>
            </Container>
        </section>
    )
}
