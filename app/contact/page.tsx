import { Container } from "@/components/layout/container"
import { ContactForm } from "@/components/contact/contact-form"
import { MapPin, Phone, Mail, Instagram, Linkedin } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <section className="pt-32 pb-16 bg-background">
                <Container className="text-center">
                    <h1 className="text-4xl font-light text-foreground sm:text-5xl md:text-6xl">Get in Touch</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                        Let's discuss how we can transform your landscape.
                    </p>
                </Container>
            </section>

            <section className="pb-24">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-light text-foreground mb-6">Contact Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="h-6 w-6 text-primary mt-1" />
                                        <div>
                                            <p className="font-medium text-foreground">Landschaft</p>
                                            <a href="https://maps.app.goo.gl/SMJx9CoePChfzdMA9" className="text-muted-foreground">2nd Floor, Watani Complex, Kondotty (Kizhisseri) <br />Kerala, India 673641</a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Phone className="h-6 w-6 text-primary" />
                                        <a href="tel:+919645333700" className="text-muted-foreground hover:text-primary transition-colors">+91 9645 333 700</a>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Mail className="h-6 w-6 text-primary" />
                                        <a href="mailto:teamlandschaft@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">teamlandschaft@gmail.com</a>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t">
                                <h2 className="text-xl font-light text-foreground mb-4">Follow Us</h2>
                                <div className="flex gap-4">
                                    <a href="https://www.instagram.com/teamlandschaft" className="p-3 bg-muted rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                                        <Instagram className="h-5 w-5" />
                                    </a>
                                    <a href="#" className="p-3 bg-muted rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                                        <Linkedin className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-background border rounded-lg p-8 shadow-sm">
                            <h2 className="text-2xl font-light text-foreground mb-6">Send us a message</h2>
                            <ContactForm />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Map Embed Placeholder */}
            <div className="h-96 w-full bg-neutral-200 flex items-center justify-center text-muted-foreground">
                Google Map Embed
            </div>
        </div>
    )
}
