import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Fonte moderna do Google
import "./globals.css"; // A importação crítica do estilo
import CookieBanner from "./components/CookieBanner";

// Configurando a fonte Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LAMPEJO | Audiovisual",
  description: "Produtora Audiovisual em Brasília.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}