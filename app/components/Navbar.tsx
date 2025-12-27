"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Controle de visibilidade e estilo
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const pathname = usePathname();

  // 1. TRAVA O SCROLL QUANDO O MENU ABRE
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 2. LÓGICA DE SCROLL DESKTOP
  useEffect(() => {
    const controlNavbar = () => {
      // Se o menu mobile estiver aberto, ignora a lógica de scroll
      if (isOpen) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Esconde ao descer
      } else {
        setIsVisible(true); // Mostra ao subir
      }

      if (currentScrollY > 50) {
        setIsScrolled(true); // Fica preto
      } else {
        setIsScrolled(false); // Fica transparente
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY, isOpen]);

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
    <>
      {/* BARRA DE NAVEGAÇÃO PRINCIPAL (Visível no Desktop e quando menu mobile tá fechado) */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled 
            ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/10 shadow-lg" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6">
          
          {/* LOGO */}
          <Link href="/" className="relative z-50" onClick={() => setIsOpen(false)}>
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

          {/* BOTÃO HAMBURGUER (Abrir Menu) */}
          <button
            className="md:hidden text-white p-2 z-50 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* --- MENU MOBILE TELA CHEIA (OVERLAY ROBUSTO) --- */}
      {/* Este bloco fica fora do header principal para garantir que cubra tudo */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-[200] flex flex-col md:hidden animate-in fade-in duration-300 font-sans">
          
          {/* Cabeçalho do Menu Mobile */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
             <span className="font-bold text-2xl tracking-tighter text-white">
               LAMPEJO
             </span>
             <button 
                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar menu"
              >
               <X size={24} />
             </button>
          </div>

          {/* Links Centralizados */}
          <div className="flex-1 flex flex-col items-center justify-center gap-10 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-4xl font-bold tracking-tighter transition-colors ${
                  isActive(link.href) ? "text-purple-400" : "text-white/70 hover:text-white"
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
          
          {/* Rodapé decorativo do menu */}
          <div className="p-6 text-center text-white/30 text-sm tracking-widest uppercase pb-10">
            © 2025 Lampejo
          </div>
        </div>
      )}
    </>
  );
}