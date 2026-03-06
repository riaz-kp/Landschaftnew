import { Container } from "@/components/layout/container"

export const metadata = {
    title: "Terms of Service | Landschaft",
    description: "Terms and conditions governing your use of the Landschaft website and services.",
}

export default function TermsPage() {
    const lastUpdated = "March 1, 2026"

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <section className="pt-32 pb-16 bg-secondary/30">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-light text-foreground sm:text-5xl md:text-6xl tracking-tight">Terms of Service</h1>
                        <p className="mt-6 text-sm text-muted-foreground uppercase tracking-widest">Last Updated: {lastUpdated}</p>
                    </div>
                </Container>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <Container>
                    <div className="max-w-3xl space-y-12">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">1. Acceptance of Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                By accessing or using the Landschaft website (www.landschaft.in), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">2. Use License</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Permission is granted to temporarily download one copy of the materials (information or software) on Landschaft&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
                                <li>Modify or copy the materials.</li>
                                <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
                                <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
                                <li>Remove any copyright or other proprietary notations from the materials.</li>
                                <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">3. Intellectual Property</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The website and its original content, features, and functionality are owned by Landschaft and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. This includes all design plans, project renderings, and creative content presented on this site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">4. Studio Services</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                All services provided by Landschaft, including design consulting, hardscaping, and softscaping, are subject to separate formal agreements. The information provided on this website is for general informational purposes only and does not constitute a binding offer for specific project pricing or timelines.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">5. User Conduct</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Users agree not to use the website for any purpose that is unlawful or prohibited by these terms. This includes, but is not limited to:
                            </p>
                            <ul className="list-disc pl-5 space-y-3 text-muted-foreground">
                                <li>Using the site in any way that could disable, damage, or overburden the infrastructure.</li>
                                <li>Attempting to gain unauthorized access to any parts of the site or our servers.</li>
                                <li>Injecting malicious code or materials.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">6. Disclaimer</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                The materials on Landschaft&apos;s website are provided on an &quot;as is&quot; basis. Landschaft makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">7. Limitations of Liability</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                In no event shall Landschaft or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if Landschaft has been notified orally or in writing of the possibility of such damage.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">8. Governing Law</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                These terms and conditions are governed by and construed in accordance with the laws of India and the state of Kerala. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">9. Changes to Terms</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Landschaft reserves the right to revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-primary">10. Contact</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                If you have any questions about these Terms of Service, please contact us at:
                            </p>
                            <p className="font-semibold text-foreground text-lg">teamlandschaft@gmail.com</p>
                        </section>
                    </div>
                </Container>
            </section>
        </div>
    )
}
