"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Briefcase,
    Settings,
    ExternalLink,
    ChevronRight,
    LogOut,
    Menu,
    X,
    UserCircle
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

import Image from "next/image"

interface SidebarItem {
    name: string
    href: string
    icon: any // For simplicity with Lucide icons
    badge?: string
}

const sidebarItems: SidebarItem[] = [
    { name: "Projects", href: "/admin", icon: LayoutDashboard },
    { name: "Careers", href: "/admin/careers", icon: Briefcase },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-slate-50/50 overflow-hidden text-slate-900">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:h-full",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="h-16 flex items-center px-6 border-b border-slate-100">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/logo.svg"
                                alt="Landschaft Logo"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                            <span className="font-black tracking-tighter text-xl text-slate-900 uppercase">LANDSCHAFT</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">Main Menu</div>
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group text-sm",
                                        isActive
                                            ? "bg-primary/10 text-primary font-medium"
                                            : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} />
                                        {item.name}
                                    </div>
                                    {item.badge && (
                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-slate-100 space-y-2">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-primary transition-colors group"
                        >
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                            Visit Website
                        </Link>

                        <div className="pt-2">
                            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                                    <UserCircle className="w-6 h-6 text-slate-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-slate-900 truncate">Admin User</p>
                                    <p className="text-[10px] text-slate-500 truncate italic">Studio Manager</p>
                                </div>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-500">
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                    <span className="font-bold tracking-tight text-primary">LANDSCHAFT</span>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -mr-2 text-slate-600 focus:outline-none hover:bg-slate-50 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto bg-slate-50/50 relative">
                    {children}
                </main>
            </div>
        </div>
    )
}
