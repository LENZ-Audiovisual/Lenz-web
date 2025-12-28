"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Navbar />

      {/* HERO SECTION */}
      <main className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background com Vídeo ou Imagem (Efeito Parallax) */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 scale-105 animate-in fade-in duration-1000"
            style={{ backgroundImage: 'url("/bg-home.jpg")' }} // Certifique-se de ter essa imagem em public/
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Conteúdo Central */}
        <div className="relative z-10 text-center px-6 max-w-5xl space-y-8">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-4 animate-in slide-in-from-bottom-10 fade-in duration-1000">
            LAMPEJO
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-300 font-light tracking-wide max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-200">
            Audiovisual na velocidade do agora. <br className="hidden md:block"/>
            Encurtamos a distância entre a ideia e o play.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300">
            <Link 
              href="/portfolio" 
              className="group bg-white text-black px-8 py-4 rounded-full font-bold tracking-widest text-sm flex items-center gap-2 hover:bg-purple-500 hover:text-white transition-all duration-300"
            >
              VER PORTFÓLIO <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
            
            <Link 
              href="/contato" 
              className="px-8 py-4 rounded-full font-bold tracking-widest text-sm text-white border border-white/20 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              ORÇAMENTO
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent opacity-50"></div>
        </div>
      </main>

      {/* SEÇÃO CONCEITO RÁPIDO */}
      <section className="py-32 px-6 border-t border-white/10 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              NÃO É SÓ VÍDEO.<br/>
              <span className="text-purple-500">É ESTRATÉGIA.</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              No mundo atual, a atenção é a moeda mais valiosa. Criamos narrativas visuais que prendem, convertem e ficam na memória. Do roteiro à pós-produção, nossa esteira é otimizada para o digital.
            </p>
            <Link href="/insights" className="text-white border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors inline-flex items-center gap-2">
              Ler nossos insights <ArrowRight size={14}/>
            </Link>
          </div>
          <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
             {/* Thumbnail simulando vídeo */}
             <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
               <Play size={64} className="text-white/20 group-hover:text-purple-500 transition-colors"/>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}