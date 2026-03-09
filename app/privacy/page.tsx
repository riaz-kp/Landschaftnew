import { Container } from "@/components/layout/container"

export const metadata = {
    title: "Privacy Policy | Landschaft",
    description: "Our commitment to protecting your privacy and managing your data at Landschaft.",
}

export default function PrivacyPage() {
    const lastUpdated = "March 1, 2026"

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <section className="pt-32 pb-16 bg-secondary/30">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-light text-foreground sm:text-5xl md:text-6xl tracking-tight">Privacy Policy</h1>
                        <p className="mt-6 text-sm text-muted-foreground uppercase tracking-widest">Last Updated: {lastUpdated}</p>
                    </div>
                </Container>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <Container>
                    <div className="max-w-3xl space-y-12">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">1. Our Commitment</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                At Landschaft, we are committed to maintaining the trust and confidence of our visitors and clients. This Privacy Policy explains how we collect, use, and protect your personal information when you interact with our website and services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">2. Information We Collect</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We may collect information in several ways:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
                                <li>
                                    <strong className="text-foreground">Personal Information:</strong> Information you provide by filling out contact forms or applying for a career position, such as your name, email address, phone number, and professional background.
                                </li>
                                <li>
                                    <strong className="text-foreground">Usage Data:</strong> Information about how you use our website, including your IP address, browser type, pages visited, and time spent on the site.
                                </li>
                                <li>
                                    <strong className="text-foreground">Cookies:</strong> We use cookies to enhance your browsing experience and analyze our traffic.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">3. How We Use Your Information</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
                                <li>Respond to your inquiries and provide landscape design and consulting services.</li>
                                <li>Process career applications and recruitment communications.</li>
                                <li>Improve our website functionality and user experience.</li>
                                <li>Comply with legal and regulatory requirements.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">4. Data Security</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">5. Data Retention</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We retain personal information for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">6. Your Rights</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Depending on your location, you may have the following rights regarding your personal information:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
                                <li>The right to access and receive a copy of your personal data.</li>
                                <li>The right to rectify inaccurate or incomplete personal data.</li>
                                <li>The right to request the deletion of your personal data.</li>
                                <li>The right to object to or restrict our processing of your personal data.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">7. Contact Us</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                If you have any questions about this Privacy Policy or our treatment of your personal information, please contact us at:
                            </p>
                            <div className="mt-8 p-8 border border-border bg-secondary/5 rounded-none inline-block w-full sm:w-auto">
                                <p className="font-semibold text-foreground text-lg mb-2">Landschaft Environmental Planning Studio</p>
                                <p className="text-sm text-muted-foreground flex flex-col gap-1">
                                    <span>Kondotty & Calicut, Kerala</span>
                                    <span>Email: teamlandschaft@gmail.com</span>
                                    <span>Phone: +91 9645 333 700</span>
                                </p>
                            </div>
                        </section>
                    </div>
                </Container>
            </section>
        </div>
    )
}
