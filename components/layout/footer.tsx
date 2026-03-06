"use client"

import Link from "next/link"
import NextImage from "next/image"
import { usePathname } from "next/navigation"
import { Container } from "@/components/layout/container"

export function Footer() {
    const pathname = usePathname()
    if (pathname?.startsWith("/admin")) return null

    return (
        <footer className="bg-primary pt-12 pb-6 md:py-16 text-primary-foreground">
            <Container>
                <div className="grid gap-y-12 gap-x-8 grid-cols-2 lg:grid-cols-4">
                    <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start">
                        <div className="flex flex-col items-center group w-full lg:w-fit">
                            <Link href="/" className="flex flex-col items-center gap-1">
                                <div className="relative h-16 w-16 md:h-24 md:w-24 opacity-90 transition-opacity group-hover:opacity-100">
                                    <NextImage
                                        src="/logo.svg"
                                        alt="Landschaft Logo Icon"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span
                                    className="text-lg md:text-xl font-bold tracking-[0.05em] transition-opacity group-hover:opacity-80 pb-2"
                                    style={{
                                        fontFamily: 'var(--font-montserrat), sans-serif',
                                        color: '#C8B8A2'
                                    }}
                                >
                                    LANDSCHAFT
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
                        <h3 className="font-semibold text-secondary uppercase tracking-widest text-[10px] md:text-xs">Navigation</h3>
                        <nav className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm text-primary-foreground/70">
                            <Link href="/about" className="hover:text-secondary transition-colors">About Us</Link>
                            <Link href="/services" className="hover:text-secondary transition-colors">Services</Link>
                            <Link href="/projects" className="hover:text-secondary transition-colors">Projects</Link>
                            <Link href="/process" className="hover:text-secondary transition-colors">Process</Link>
                            <Link href="/careers" className="hover:text-secondary transition-colors">Careers</Link>
                        </nav>
                    </div>

                    <div className="col-span-1 lg:col-span-1 flex flex-col gap-4">
                        <h3 className="font-semibold text-secondary uppercase tracking-widest text-[10px] md:text-xs">Services</h3>
                        <nav className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm text-primary-foreground/70">
                            <Link href="/services#design" className="hover:text-secondary transition-colors">Design & Consulting</Link>
                            <Link href="/services#hardscape" className="hover:text-secondary transition-colors">Hardscaping</Link>
                            <Link href="/services#softscape" className="hover:text-secondary transition-colors">Softscaping</Link>
                            <Link href="/services#maintenance" className="hover:text-secondary transition-colors">Maintenance</Link>
                        </nav>
                    </div>

                    <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
                        <h3 className="font-semibold text-secondary uppercase tracking-widest text-[10px] md:text-xs">Contact</h3>
                        <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm text-primary-foreground/70">
                            <a href="https://maps.app.goo.gl/SMJx9CoePChfzdMA9" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Kondotty, Kerala</a>
                            <a href="tel:+91 9645 333 700" className="hover:text-secondary transition-colors">+91 9645 333 700</a>
                            <a href="mailto:teamlandschaft@gmail.com" className="hover:text-secondary transition-colors">teamlandschaft@gmail.com</a>
                            <div className="flex gap-6 mt-1">
                                <a href="https://www.instagram.com/teamlandschaft" target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-xs uppercase tracking-wider hover:text-secondary transition-colors">Instagram</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-6 md:mt-20 md:flex-row md:gap-0">
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
