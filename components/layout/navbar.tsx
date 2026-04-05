"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Process", href: "/process" },
    { name: "Careers", href: "/careers" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        // Check initial scroll position
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Lock body scroll when menu is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    // Close menu on route change
    React.useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    if (pathname?.startsWith("/admin")) return null

    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full border-b transition-all duration-300",
                scrolled
                    ? "bg-background/90 backdrop-blur-xl shadow-sm"
                    : "bg-background/70 backdrop-blur-md"
            )}
        >
            <Container className="flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 z-50 relative group">
                    <span
                        className="text-xl font-bold tracking-[0.05em] text-primary transition-opacity group-hover:opacity-80 pb-1"
                        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                    >
                        LANDSCHAFT
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
                    {navItems.map((item) => {
                        const isActive = item.href === "/"
                            ? pathname === "/"
                            : pathname?.startsWith(item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center h-full text-sm font-medium transition-colors group",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                <span>{item.name}</span>

                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                                {!isActive && (
                                    <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100 opacity-0 group-hover:opacity-50" />
                                )}
                            </Link>
                        )
                    })}
                    <Button asChild className="ml-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                        <Link href="/contact">Book Consultation</Link>
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 relative p-2 -mr-2 text-foreground focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Mobile Navigation Overlay - Portalled out of header context */}
                {mounted && createPortal(
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 z-[9999] flex flex-col bg-background h-[100dvh] w-screen"
                            >
                                {/* Mobile Header for Close Button */}
                                <div className="border-b">
                                    <Container className="flex h-16 items-center justify-between">
                                        <Link href="/" className="flex items-center space-x-2 z-50 relative group" onClick={() => setIsOpen(false)}>
                                            <span
                                                className="text-xl font-bold tracking-[0.05em] text-primary transition-opacity group-hover:opacity-80 pb-1"
                                                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                                            >
                                                LANDSCHAFT
                                            </span>
                                        </Link>
                                        <button
                                            className="p-2 -mr-2 text-foreground focus:outline-none"
                                            onClick={() => setIsOpen(false)}
                                            aria-label="Close menu"
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </Container>
                                </div>

                                <nav className="flex-1 flex flex-col justify-center gap-4 p-6 overflow-hidden">
                                    {navItems.map((item, index) => {
                                        const isActive = item.href === "/"
                                            ? pathname === "/"
                                            : pathname?.startsWith(item.href)

                                        return (
                                            <motion.div
                                                key={item.href}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 + index * 0.05 }}
                                                className="text-center"
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "text-lg tracking-tight transition-all inline-flex items-center justify-center px-6 py-2.5 rounded-full",
                                                        isActive
                                                            ? "bg-[#D6C7B2] text-[#1F3D2B] font-medium shadow-sm"
                                                            : "text-foreground hover:bg-[#D6C7B2]/30 font-light hover:text-primary"
                                                    )}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            </motion.div>
                                        )
                                    })}

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="pt-6 flex justify-center"
                                    >
                                        <Button className="w-full max-w-xs text-lg h-12 rounded-full" size="lg" asChild>
                                            <Link href="/contact" onClick={() => setIsOpen(false)}>
                                                Book Consultation
                                            </Link>
                                        </Button>
                                    </motion.div>
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
            </Container>
        </header>
    )
}
