"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detecta scroll para mudar o fundo da navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "HOME", href: "/" },
    { title: "PORTFÓLIO", href: "/portfolio" },
    { title: "INSIGHTS", href: "/insights" },
    { title: "ACADEMY", href: "/academy" },
    { title: "CONTATO", href: "/contato" },
  ];

  // Função auxiliar para verificar se o link está ativo
  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6">
        {/* LOGO */}
        <Link href="/" className="relative w-32 h-10">
           <span className="font-bold text-2xl tracking-tighter text-white">LAMPEJO</span>
        </Link>

        {/* DESKTOP MENU (Sem o botão LINKS) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`text-sm font-bold tracking-widest transition-colors relative group ${
                isActive(link.href) 
                  ? "text-purple-400"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.title}
              {/* Linha animada embaixo do link ativo */}
              <span className={`absolute -bottom-2 left-0 h-[2px] bg-purple-400 transition-all duration-300 ${
                isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MOBILE MENU OVERLAY (Sem o botão LINKS) */}
        {isOpen && (
          <div className="fixed inset-0 top-[70px] bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-bold tracking-tighter transition-colors ${
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