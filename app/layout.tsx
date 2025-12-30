import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

const GA_MEASUREMENT_ID = "G-B9XLZL73HX"; 

export const metadata: Metadata = {
  title: "Lampejo | Audiovisual na velocidade do agora",
  description: "Produtora audiovisual em Brasília focada em narrativas de impacto. Do roteiro ao play.",
  keywords: ["Produtora de Vídeo", "Brasília", "Audiovisual", "Filmmaker", "Edição", "Motion Graphics", "Lampejo"],
  authors: [{ name: "Lampejo Audiovisual" }],
  openGraph: {
    title: "Lampejo | Audiovisual na velocidade do agora",
    description: "Encurtamos a distância entre a ideia e o play.",
    url: "https://lampejo.rec.br",
    siteName: "Lampejo",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Lampejo Audiovisual" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans bg-black text-white antialiased">
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
          `}
        </Script>
        
        {/* SEO TÉCNICO (JSON-LD) */}
        <Script id="json-ld" type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoProductionService",
            "name": "Lampejo Audiovisual",
            "url": "https://lampejo.rec.br",
            "logo": "https://lampejo.rec.br/logo-lampejo.png",
            "areaServed": "Brasília",
            "description": "Produtora audiovisual focada em narrativas de impacto e velocidade de entrega.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Brasília",
              "addressRegion": "DF",
              "addressCountry": "BR"
            },
            "sameAs": [
              "https://instagram.com/lampejo.rec"
            ]
          })
        }} />

        {children}
      </body>
    </html>
  );
}