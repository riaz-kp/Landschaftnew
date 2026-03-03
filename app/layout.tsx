import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Landschaft | Environmental Planning & Landscape Architecture",
  description: "Crafting living landscapes that endure. A design-led environmental planning studio in Kerala.",
  keywords: "landscape architecture, environmental planning, garden design, kerala, landschaft",
  openGraph: {
    title: "Landschaft | Landscape as Living Art",
    description: "Crafting living landscapes that endure. A design-led environmental planning studio.",
    type: "website",
    locale: "en_IE", // Or en_IN
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
