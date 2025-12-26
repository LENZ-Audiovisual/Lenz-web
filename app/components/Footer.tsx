import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* COLUNA 1: Marca e Slogan */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter">LAMPEJO</h2>
            <p className="text-neutral-400 max-w-sm leading-relaxed">
              Audiovisual na velocidade do agora. Encurtamos a distância entre a ideia e o play com qualidade cinematográfica.
            </p>
          </div>

          {/* COLUNA 2: Mapa do Site */}
          <div>
            <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">Menu</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/portfolio" className="hover:text-blue-400 transition-colors">Portfólio</Link></li>
              <li><Link href="/insights" className="hover:text-blue-400 transition-colors">Insights</Link></li>
              <li><Link href="/contato" className="hover:text-blue-400 transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* COLUNA 3: Contato Rápido */}
          <div>
            <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-6">Fale Conosco</h3>
            <ul className="space-y-4 text-neutral-300">
              <li>
                <a href="mailto:lampejo.rec@gmail.com" className="hover:text-white transition-colors">
                  lampejo.rec@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/5561994079423" target="_blank" className="hover:text-green-400 transition-colors">
                  +55 61 9 9407-9423
                </a>
              </li>
              <li className="text-neutral-500 pt-2">
                Brasília, DF — Brasil
              </li>
            </ul>
          </div>
        </div>

        {/* BARRA INFERIOR: Copyright e Sociais */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-sm">
            &copy; {currentYear} Lampejo Audiovisual. Todos os direitos reservados.
          </p>

          <div className="flex gap-6">
            {/* Instagram Icon - Link Atualizado */}
            <a 
              href="https://www.instagram.com/lampejo_audiovisual/" 
              target="_blank" 
              className="text-neutral-400 hover:text-pink-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            
            {/* LinkedIn Icon - Link Atualizado */}
            <a 
              href="https://www.linkedin.com/in/lampejo-audiovisual/" 
              target="_blank" 
              className="text-neutral-400 hover:text-blue-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}