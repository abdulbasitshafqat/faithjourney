import type { Metadata } from "next";
import { Playfair_Display, Amiri, Lora, Gulzar } from "next/font/google"; // Import next/font/google first as it's a built-in
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { FontSizeProvider } from "@/components/providers/FontSizeProvider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import AppFlowProvider from "@/components/providers/AppFlowProvider";
import { BottomNav } from "@/components/layout/BottomNav";
import { AppSplash } from "@/components/layout/AppSplash";
import { AudioPlayerProvider } from "@/components/providers/AudioPlayerContext";
import { FloatingAudioPlayer } from "@/components/quran/FloatingAudioPlayer";
import "./globals.css";
// ... (rest remains unchanged)


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

const gulzar = Gulzar({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-gulzar",
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

const jsonLd = [
  {
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
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Faith Journey really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Faith Journey is a labor of love produced for the sake of the Ummah. Core features will always be free and ad-free."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate are the prayer times?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We use high-precision GPS coordinates and the latest astronomical algorithms from Aladhan for peak accuracy."
        }
      },
      {
        "@type": "Question",
        "name": "Are the Hadiths verified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We only source from primary authentic collections (Sahih Bukhari, Muslim, etc.) to ensure your knowledge is based on Truth."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use it offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The mobile app (PWA) caches your recent readings and prayer times, allowing access even during limited connectivity."
        }
      }
    ]
  }
];

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
        className={`${playfair.variable} ${lora.variable} ${amiri.variable} ${gulzar.variable} font-serif antialiased bg-background text-foreground`}
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
                <AudioPlayerProvider>
                  {children}
                  <BottomNav />
                  <FloatingAudioPlayer />
                  <ScrollToTop />
                  <Toaster />
                </AudioPlayerProvider>
              </FontSizeProvider>
            </ReactQueryProvider>
          </AppFlowProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
