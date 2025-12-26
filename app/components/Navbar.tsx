"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Aumentei a barra para h-28 (112px) - Bem alta
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        
        {/* LOGO COM ZOOM */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo-lampejo.png" 
            alt="Lampejo Logo"
            width={300} 
            height={300}
            // AQUI ESTÁ O SEGREDO:
            // h-20 md:h-24: Altura bruta grande
            // scale-125: Dá um zoom de 25% na imagem
            // origin-left: Garante que o zoom não corte o lado esquerdo
            className="w-auto h-20 md:h-24 object-contain hover:opacity-80 transition-opacity scale-125 origin-left"
            priority 
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-gray-400">
          <Link href="/portfolio" className="hover:text-white transition-colors">Portfólio</Link>
          <Link href="/cursos" className="hover:text-white transition-colors">Academy</Link>
          <Link href="/loja" className="hover:text-white transition-colors">Shop</Link>
          <Link href="/contato" className="hover:text-white transition-colors">Contato</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-28 left-0 w-full bg-background border-b border-white/10 p-6 flex flex-col gap-6 text-center uppercase tracking-widest"
        >
          <Link href="/portfolio" onClick={() => setIsOpen(false)}>Portfólio</Link>
          <Link href="/cursos" onClick={() => setIsOpen(false)}>Academy</Link>
          <Link href="/loja" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link href="/contato" onClick={() => setIsOpen(false)}>Contato</Link>
        </motion.div>
      )}
    </header>
  );
}