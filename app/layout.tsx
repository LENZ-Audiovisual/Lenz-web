import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Ou a fonte que você estiver usando
import "./globals.css";
import Footer from "./components/Footer"; // <--- 1. Importe o Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lampejo | Produtora Audiovisual",
  description: "Audiovisual na velocidade do agora.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        
        {/* O conteúdo das páginas (Home, Contato, etc) entra aqui */}
        {children}

        {/* O Footer ficará fixo no final de tudo */}
        <Footer /> 

      </body>
    </html>
  );
}