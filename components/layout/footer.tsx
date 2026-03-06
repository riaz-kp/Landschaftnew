"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "@/components/layout/container"

export function Footer() {
    const pathname = usePathname()
    if (pathname?.startsWith("/admin")) return null

    return (
        <footer className="border-t bg-secondary/30 pt-10 pb-6 md:py-16">
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
                            <Link href="/careers" className="hover:text-primary transition-colors">Careers</Link>
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
                            <a href="https://maps.app.goo.gl/SMJx9CoePChfzdMA9" target="_blank" rel="noopener noreferrer">Kondotty, Kerala</a>
                            <a href="tel:+91 9645 333 700">+91 9645 333 700</a>
                            <a href="mailto:teamlandschaft@gmail.com">teamlandschaft@gmail.com</a>
                            <div className="flex gap-4 mt-2">
                                <a href="https://www.instagram.com/teamlandschaft" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider hover:text-primary transition-colors">Instagram</a>
                                <span className="text-xs uppercase tracking-wider">LinkedIn</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 md:mt-12 md:flex-row md:gap-0 md:pt-8">
                    <p className="text-[10px] text-muted-foreground sm:text-xs">
                        © {new Date().getFullYear()} Landschaft. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-[10px] text-muted-foreground sm:text-xs">
                        <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
