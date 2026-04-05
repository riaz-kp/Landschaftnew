import { Container } from "@/components/layout/container"
import { FAQ as FAQSection, faqItems } from "@/components/home/faq"
import { FadeIn } from "@/components/animations/fade-in"

export const metadata = {
  title: "FAQs | Landschaft",
  description: "Quick answers to common questions about our premium landscape design and construction services in Kerala.",
  keywords: ["landscape design Kerala", "garden construction Calicut", "sustainable landscaping", "landscape architecture FAQ", "design-build firm Kerala"],
}

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <main className="flex-1">
      {/* Structured Data for SEO/GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-24 md:pt-32 bg-background">
        <FAQSection />
      </section>
      
      <section className="py-24 bg-background border-t border-border/50">
        <Container>
          <div className="bg-primary rounded-2xl p-12 text-center text-primary-foreground shadow-xl transition-transform hover:scale-[1.01] duration-500">
            <h2 className="text-3xl font-light mb-4">Have a unique vision?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-lg leading-relaxed font-light">
              We architecturalize dreams. Reach out to our specialized team to discuss your specific property requirements and get a personalized site assessment.
            </p>
            <a 
              href="/contact" 
              className="inline-flex h-12 items-center justify-center rounded-full bg-background px-10 text-sm font-medium text-primary transition-all hover:bg-background/90 hover:shadow-lg active:scale-95"
            >
              Start Your Journey
            </a>
          </div>
        </Container>
      </section>
    </main>
  )
}
