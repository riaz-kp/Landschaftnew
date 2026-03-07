import { Container } from "@/components/layout/container"
import { ContactForm } from "@/components/contact/contact-form"
import { MapPin, Phone, Mail, Instagram } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(122,139,111,0.1),transparent)] pointer-events-none" />
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-8">
                            Let's bring your <span className="text-accent italic">vision</span> to life.
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                            Whether you're looking to transform a private garden or a commercial landscape,
                            our team is ready to help you create something extraordinary.
                        </p>
                    </div>
                </Container>
            </section>

            <section className="pb-32">
                <Container>
                    <div className="grid gap-16 lg:grid-cols-12">
                        {/* Contact Info - Left Column (5/12) */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h2 className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-primary/80 uppercase mb-8">Contact Details</h2>
                                <div className="space-y-10">
                                    <div className="group flex items-start gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/80 mb-2">Visit Our Studio</p>
                                            <a
                                                href="https://maps.app.goo.gl/SMJx9CoePChfzdMA9"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-lg font-light text-foreground hover:text-accent transition-colors block leading-snug"
                                            >
                                                2nd Floor, Watani Complex, <br />
                                                Kondotty (Kizhisseri), <br />
                                                Kerala, India 673641
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/80 mb-2">Call Us</p>
                                            <a href="tel:+919645333700" className="text-xl font-light text-foreground hover:text-accent transition-colors">
                                                +91 9645 333 700
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/80 mb-2">Email Us</p>
                                            <a href="mailto:teamlandschaft@gmail.com" className="text-xl font-light text-foreground hover:text-accent transition-colors break-all">
                                                teamlandschaft@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-12 border-t border-border/50">
                                <h2 className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-primary/80 uppercase mb-6">Socials</h2>
                                <div className="flex gap-4">
                                    <a
                                        href="https://www.instagram.com/teamlandschaft"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 border border-border rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                                    >
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Form - Right Column (7/12) */}
                        <div className="lg:col-span-7">
                            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                <h2 className="text-2xl font-light text-foreground mb-8">Send a message</h2>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
