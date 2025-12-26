"use client";
import Link from 'next/link';
import Image from 'next/image'; // Importando o componente de imagem
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO DE IMAGEM */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo-lampejo.png" // O caminho começa com / e já olha dentro da pasta public
            alt="Lampejo Logo"
            width={150} // Largura base para o Next otimizar
            height={150} // Altura base para o Next otimizar
            className="w-auto h-10 md:h-12 object-contain hover:opacity-80 transition-opacity" // H-10 no celular, H-12 no PC
            priority // Carrega a logo imediatamente
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
          className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-white/10 p-6 flex flex-col gap-6 text-center uppercase tracking-widest"
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