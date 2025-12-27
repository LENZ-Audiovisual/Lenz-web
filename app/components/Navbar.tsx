"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Lógica de Scroll para mudar o visual da Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Adiciona o evento
    window.addEventListener("scroll", handleScroll);
    
    // Remove o evento ao sair (limpeza)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "HOME", href: "/" },
    { title: "PORTFÓLIO", href: "/portfolio" },
    { title: "INSIGHTS", href: "/insights" },
    { title: "ACADEMY", href: "/academy" },
    { title: "CONTATO", href: "/contato" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <header
      // AQUI ESTÁ A MÁGICA DO SCROLL
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out ${
        scrolled 
          ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/10 shadow-lg" // ESTADO ROLADO (Preto)
          : "bg-transparent py-6" // ESTADO TOPO (Transparente)
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6">
        
        {/* LOGO */}
        <Link href="/" className="relative z-50">
           <span className="font-bold text-2xl tracking-tighter text-white hover:text-neutral-300 transition-colors">
             LAMPEJO
           </span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`text-sm font-bold tracking-widest transition-all duration-300 relative group ${
                isActive(link.href) 
                  ? "text-purple-400"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.title}
              <span className={`absolute -bottom-2 left-0 h-[2px] bg-purple-400 transition-all duration-300 ${
                isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </nav>

        {/* BOTÃO MOBILE */}
        <button
          className="md:hidden text-white p-2 z-50 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MENU MOBILE (Tela Cheia) */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in zoom-in-95 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-3xl font-bold tracking-tighter transition-colors ${
                  isActive(link.href) ? "text-purple-400" : "text-white/70 hover:text-white"
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}