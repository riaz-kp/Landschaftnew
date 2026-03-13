import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landschaft.in"),
  title: {
    default: "Landschaft | Environmental Planning & Landscape Architecture",
    template: "%s | Landschaft",
  },
  description: "Crafting living landscapes that endure. A design-led environmental planning studio in Kerala specializing in landscape architecture and environmental design.",
  keywords: ["landscape architecture", "environmental planning", "garden design", "kerala", "landschaft", "sustainable design", "urban planning"],
  authors: [{ name: "Landschaft" }],
  creator: "Landschaft",
  publisher: "Landschaft",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Landschaft | Environmental Planning & Landscape Architecture",
    description: "Crafting living landscapes that endure. A design-led environmental planning studio in Kerala.",
    url: "https://landschaft.in",
    siteName: "Landschaft",
    images: [
      {
        url: "/images/hero.jpeg", // Using existing hero image as OG image for now
        width: 1200,
        height: 630,
        alt: "Landschaft Landscape Architecture",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Landschaft | Environmental Planning & Landscape Architecture",
    description: "Crafting living landscapes that endure. A design-led environmental planning studio in Kerala.",
    images: ["/images/hero.jpeg"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  verification: {
    google: "google-site-verification=vN6IKWxBptXF55xb63EpRLT8t_URehUFRQKt7-kYgE0", // To be replaced by the user
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Landschaft",
              "url": "https://landschaft.in",
              "logo": "https://landschaft.in/logo.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9645-333-700",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": "en"
              },
              "sameAs": [
                "https://www.instagram.com/teamlandschaft"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
