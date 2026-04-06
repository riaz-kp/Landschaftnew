import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

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
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://landschaft.in/#organization",
                  "name": "Landschaft",
                  "url": "https://landschaft.in",
                  "logo": "https://landschaft.in/logo.png",
                  "image": "https://landschaft.in/images/hero.jpeg",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-9645-333-700",
                    "contactType": "customer service",
                    "areaServed": "IN",
                    "availableLanguage": "en"
                  },
                  "sameAs": [
                    "https://www.instagram.com/teamlandschaft",
                    "https://www.facebook.com/p/Landschaft-100067467157622/"
                  ]
                },
                {
                  "@type": "LandscapingService",
                  "@id": "https://landschaft.in/#kondotty-studio",
                  "name": "Landschaft - Kondotty Studio",
                  "description": "Premium landscape architecture, environmental planning, and garden design services in Kondotty, Kerala.",
                  "url": "https://landschaft.in/contact",
                  "telephone": "+91-9645-333-700",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "2nd Floor, Watani Complex, Kondotty (Kizhisseri)",
                    "addressLocality": "Malappuram",
                    "addressRegion": "Kerala",
                    "postalCode": "673641",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "11.1444",
                    "longitude": "75.9611"
                  },
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:00",
                    "closes": "18:00"
                  }
                },
                {
                  "@type": "LandscapingService",
                  "@id": "https://landschaft.in/#calicut-studio",
                  "name": "Landschaft - Calicut Studio",
                  "description": "Premium landscape architecture and design studio in Calicut, Kerala.",
                  "url": "https://landschaft.in/contact",
                  "telephone": "+91-9645-333-700",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "13/2306 Near Blum, Chevarambalam Road, Malaparamba",
                    "addressLocality": "Calicut",
                    "addressRegion": "Kerala",
                    "postalCode": "673009",
                    "addressCountry": "IN"
                  },
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:00",
                    "closes": "18:00"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://landschaft.in/#website",
                  "url": "https://landschaft.in",
                  "name": "Landschaft",
                  "publisher": {
                    "@id": "https://landschaft.in/#organization"
                  }
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
