import type { Metadata } from "next";
import { Playfair_Display, Amiri, Lora } from "next/font/google"; // Import next/font/google first as it's a built-in
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { FontSizeProvider } from "@/components/providers/FontSizeProvider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import AppFlowProvider from "@/components/providers/AppFlowProvider";
import { BottomNav } from "@/components/layout/BottomNav";
import { AppSplash } from "@/components/layout/AppSplash";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://faithjourney.pro'),
  title: {
    default: "Faith Journey - Your Islamic Spiritual Companion",
    template: "%s | Faith Journey"
  },
  description: "Faith Journey is a premium, aesthetically serene Islamic web application offering Quran, authentic Hadith, Prayer times, Tasbih, and Islamic knowledge for your spiritual growth.",
  keywords: ["Islamic app", "Quran online", "Authentic Hadith", "Prayer times", "Islamic knowledge", "Tasbih counter", "Faith Journey", "Islamic spirituality"],
  authors: [{ name: "Faith Journey Team" }],
  creator: "Faith Journey",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://faithjourney.pro",
    siteName: "Faith Journey",
    title: "Faith Journey - Your Islamic Spiritual Companion",
    description: "Deepen your faith with our premium Islamic tools: Quran, Hadith, Prayer Times, and more.",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Faith Journey Logo"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faith Journey - Your Islamic Spiritual Companion",
    description: "A premium Islamic web experience for spiritual growth.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "tZ9MAwXa5iOIoynLBjFxsjLMpKAVgBhpN6EEE_nmhHI",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Faith Journey",
  "url": "https://faithjourney.pro",
  "description": "Comprehensive Islamic platform featuring Quran, Hadith, and spiritual tools.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://faithjourney.pro/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${lora.variable} ${amiri.variable} font-serif antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppSplash />
          <AppFlowProvider>
            <ReactQueryProvider>
              <FontSizeProvider>
                {children}
                <BottomNav />
                <ScrollToTop />
                <Toaster />
              </FontSizeProvider>
            </ReactQueryProvider>
          </AppFlowProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
