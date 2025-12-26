"use client"; // Obrigatório para usar lógica de scroll

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // Lógica 1: Saber se estamos no topo absoluto (para transparência)
        if (currentScrollY < 10) {
          setIsAtTop(true);
        } else {
          setIsAtTop(false);
        }

        // Lógica 2: Esconder ao descer, mostrar ao subir
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Se desceu e passou de 100px -> Esconde (Recua)
          setIsVisible(false);
        } else {
          // Se subiu -> Mostra
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    // Limpa o evento para não travar o site
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed w-full z-50 top-0 left-0 flex items-center justify-between px-8 md:px-12 transition-all duration-500 ease-in-out pointer-events-none
      ${isVisible ? "translate-y-0" : "-translate-y-full"} 
      ${isAtTop ? "bg-transparent py-8" : "bg-black/80 backdrop-blur-md py-4 border-b border-white/5 shadow-lg"}
      `}
    >
      
      {/* Esquerda: Logo */}
      <div className="pointer-events-auto">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity">
          LAMPEJO AUDIOVISUAL
        </Link>
      </div>

      {/* Direita: Menu Links */}
      <div className="pointer-events-auto hidden md:flex items-center gap-10">
        <Link 
          href="/" 
          className="text-xs font-bold tracking-widest text-neutral-400 hover:text-white transition-colors uppercase"
        >
          Início
        </Link>

        <Link 
          href="/portfolio" 
          className="text-xs font-bold tracking-widest text-neutral-400 hover:text-white transition-colors uppercase"
        >
          Portfólio
        </Link>
        
        <Link 
          href="/insights" 
          className="text-xs font-bold tracking-widest text-neutral-400 hover:text-white transition-colors uppercase"
        >
          Insights
        </Link>
        
        <Link 
          href="/academy" 
          className="text-xs font-bold tracking-widest text-purple-400 hover:text-white transition-colors uppercase"
        >
          Academy
        </Link>
        
        <Link 
          href="/contato" 
          className="text-xs font-bold tracking-widest text-neutral-400 hover:text-white transition-colors uppercase"
        >
          Contato
        </Link>
      </div>

      {/* Botão Mobile */}
      <div className="md:hidden pointer-events-auto">
        <Link href="/contato" className="text-sm font-bold text-white">
          MENU
        </Link>
      </div>
    </nav>
  );
}