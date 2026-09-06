import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PwaInit from "@/components/PwaInit";

export const viewport = {
  themeColor: "#0d1e36",
};

export const metadata = {
  metadataBase: new URL("https://www.tasariegitimyayinlari.com"),
  title: "Tasarı Eğitim Yayınları | DGS · YÖS · ALES · KPSS",
  description: "Tasarı Eğitim Yayınları – 1984'ten bu yana DGS, YÖS, ALES, KPSS ve TYT-AYT alanlarında Türkiye'nin lider eğitim kurumu.",
  keywords: ["DGS", "YÖS", "ALES", "KPSS", "Tasarı Eğitim", "Deneme Çözümleri", "Soru Bankası"],
  authors: [{ name: "Tasarı Eğitim Yayınları" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tasarı Eğitim",
  },
  openGraph: {
    title: "Tasarı Eğitim Yayınları | Şampiyonların Tercihi",
    description: "Türkiye'nin eğitim devinden DGS, YÖS, ALES, KPSS çözümleri ve yayınları.",
    url: "https://tasariegitimyayinlari.com",
    siteName: "Tasarı Eğitim Yayınları",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tasarı Eğitim Yayınları Open Graph Kartı",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-512x512.png" />
      </head>
      <body suppressHydrationWarning>
        <PwaInit />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
