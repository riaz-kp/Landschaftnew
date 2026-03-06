"use client"

import Link from "next/link"
import NextImage from "next/image"
import { usePathname } from "next/navigation"
import { Container } from "@/components/layout/container"

export function Footer() {
    const pathname = usePathname()
    if (pathname?.startsWith("/admin")) return null

    return (
        <footer className="bg-primary pt-10 pb-6 md:py-16 text-primary-foreground">
            <Container>
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex flex-col items-center gap-1 group w-fit">
                            <div className="relative h-24 w-24 opacity-90 transition-opacity group-hover:opacity-100">
                                <NextImage
                                    src="/logo.svg"
                                    alt="Landschaft Logo Icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span
                                className="text-xl font-bold tracking-[0.05em] transition-opacity group-hover:opacity-80 pb-2"
                                style={{
                                    fontFamily: 'var(--font-montserrat), sans-serif',
                                    color: '#C8B8A2'
                                }}
                            >
                                LANDSCHAFT
                            </span>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="font-semibold text-secondary uppercase tracking-widest text-xs">Navigation</h3>
                        <nav className="flex flex-col gap-3 text-sm text-primary-foreground/70">
                            <Link href="/about" className="hover:text-secondary transition-colors">About Us</Link>
                            <Link href="/services" className="hover:text-secondary transition-colors">Services</Link>
                            <Link href="/projects" className="hover:text-secondary transition-colors">Projects</Link>
                            <Link href="/process" className="hover:text-secondary transition-colors">Process</Link>
                            <Link href="/careers" className="hover:text-secondary transition-colors">Careers</Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="font-semibold text-secondary uppercase tracking-widest text-xs">Services</h3>
                        <nav className="flex flex-col gap-3 text-sm text-primary-foreground/70">
                            <Link href="/services#design" className="hover:text-secondary transition-colors">Design & Consulting</Link>
                            <Link href="/services#hardscape" className="hover:text-secondary transition-colors">Hardscaping</Link>
                            <Link href="/services#softscape" className="hover:text-secondary transition-colors">Softscaping</Link>
                            <Link href="/services#maintenance" className="hover:text-secondary transition-colors">Maintenance</Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="font-semibold text-secondary uppercase tracking-widest text-xs">Contact</h3>
                        <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
                            <a href="https://maps.app.goo.gl/SMJx9CoePChfzdMA9" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Kondotty, Kerala</a>
                            <a href="tel:+91 9645 333 700" className="hover:text-secondary transition-colors">+91 9645 333 700</a>
                            <a href="mailto:teamlandschaft@gmail.com" className="hover:text-secondary transition-colors">teamlandschaft@gmail.com</a>
                            <div className="flex gap-6 mt-2">
                                <a href="https://www.instagram.com/teamlandschaft" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider hover:text-secondary transition-colors">Instagram</a>
                                <span className="text-xs uppercase tracking-wider opacity-50">LinkedIn</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:mt-20 md:flex-row md:gap-0">
                    <p className="text-[10px] text-primary-foreground/50 sm:text-xs">
                        © {new Date().getFullYear()} Landschaft. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-[10px] text-primary-foreground/50 sm:text-xs">
                        <Link href="/privacy" className="hover:text-secondary">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-secondary">Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
