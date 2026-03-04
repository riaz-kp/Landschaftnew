"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "@/components/layout/container"

export function Footer() {
    const pathname = usePathname()
    if (pathname?.startsWith("/admin")) return null

    return (
        <footer className="border-t bg-secondary/30 py-12 md:py-16">
            <Container>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
                            LANDSCHAFT
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Crafting living landscapes that endure. An environmental planning studio combining design precision with ecology.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-foreground">Navigation</h3>
                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
                            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
                            <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
                            <Link href="/process" className="hover:text-primary transition-colors">Process</Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-foreground">Services</h3>
                        <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <Link href="/services#design" className="hover:text-primary transition-colors">Design & Consulting</Link>
                            <Link href="/services#hardscape" className="hover:text-primary transition-colors">Hardscaping</Link>
                            <Link href="/services#softscape" className="hover:text-primary transition-colors">Softscaping</Link>
                            <Link href="/services#maintenance" className="hover:text-primary transition-colors">Maintenance</Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-foreground">Contact</h3>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <a href="https://maps.app.goo.gl/SMJx9CoePChfzdMA9">Kondotty, Kerala</a>
                            <a href="tel:+91 9645 333 700">+91 9645 333 700</a>
                            <a href="mailto:teamlandschaft@gmail.com">teamlandschaft@gmail.com</a>
                            <div className="flex gap-4 mt-2">
                                {/* Social icons would go here */}
                                <a href="https://www.instagram.com/teamlandschaft" className="text-xs uppercase tracking-wider">Instagram</a>
                                <span className="text-xs uppercase tracking-wider">LinkedIn</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row md:gap-0">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Landschaft. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                        <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
