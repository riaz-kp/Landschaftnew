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
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        setMounted(true)
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
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
            <Container className="flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 z-50 relative">
                    <span className="text-xl font-bold tracking-tight text-primary">LANDSCHAFT</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button asChild>
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
                                <div className="flex items-center justify-between p-4 px-6 border-b h-16">
                                    <span className="text-xl font-bold tracking-tight text-primary">LANDSCHAFT</span>
                                    <button
                                        className="p-2 -mr-2 text-foreground focus:outline-none"
                                        onClick={() => setIsOpen(false)}
                                        aria-label="Close menu"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <nav className="flex-1 flex flex-col justify-center gap-6 p-8 overflow-y-auto">
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
                                                        "text-xl font-light tracking-tight transition-colors inline-flex items-center gap-4",
                                                        isActive ? "text-primary italic" : "text-foreground hover:text-primary"
                                                    )}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {isActive && (
                                                        <motion.span
                                                            layoutId="activeDot"
                                                            className="h-2 w-2 rounded-full bg-primary"
                                                        />
                                                    )}
                                                    {item.name}
                                                </Link>
                                            </motion.div>
                                        )
                                    })}

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="pt-12 flex justify-center"
                                    >
                                        <Button className="w-full max-w-xs text-lg h-14 rounded-full" size="lg" asChild>
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
