"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

// DADOS DOS SERVIÇOS (Conteúdo que muda ao clicar)
const SERVICES = [
  {
    id: 0,
    title: "Manifesto Lampejo",
    description: "Nossa essência em movimento. Entenda como pensamos e por que fazemos o que fazemos.",
    tag: "Showreel 2025",
    videoTitle: "ASSISTA AO MANIFESTO"
  },
  {
    id: 1,
    title: "Cobertura Real-Time",
    description: "Captação, edição e postagem enquanto o evento acontece. A velocidade que o feed exige.",
    tag: "Eventos & Experience",
    videoTitle: "CASE: NIC.BR AO VIVO"
  },
  {
    id: 2,
    title: "Transmissão & Lives",
    description: "Estúdio móvel, multicâmera e corte ao vivo. Levamos a estrutura de TV para o seu evento.",
    tag: "Broadcast",
    videoTitle: "TRANSMISSÃO OAB/DF"
  },
  {
    id: 3,
    title: "Podcasts & Videocasts",
    description: "Da captação de áudio cristalino aos cortes virais para TikTok e Reels. Estrutura completa.",
    tag: "Estúdio & Conteúdo",
    videoTitle: "PRODUÇÃO DE VIDEOCAST"
  },
  {
    id: 4,
    title: "Conteúdo Vertical",
    description: "Vídeos pensados nativamente para a tela do celular. Reels e TikToks que retêm a atenção.",
    tag: "Social Video",
    videoTitle: "REELS: ESTADÃO"
  }
];

const CLIENTS = [
  { name: "NIC.br", logo: "/nicbr.png" },
  { name: "CGI.br", logo: "/cgibr.png" },
  { name: "Safernet", logo: "/safernet.png" },
  { name: "CAADF", logo: "/caadf.png" },
  { name: "OAB/DF", logo: "/oabdf.png" },
  { name: "Estadão", logo: "/estadao.png" },
  { name: "HY Produções", logo: "/hy.png" },
  { name: "Sem Rótulo", logo: "/semrotulo.png" },
  { name: "Sinicon", logo: "/sinicon.png" },
];

export default function Home() {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="bg-black text-white selection:bg-purple-500/30 overflow-x-hidden">
      <Navbar />

      <main>
        {/* SESSÃO 1: HERO (VERSÃO APROVADA - CENTRALIZADA) */}
        <section className="h-screen flex flex-col justify-center items-center px-6 text-center relative overflow-hidden">
          
          {/* Glow Centralizado */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 z-10 animate-in slide-in-from-bottom-10 fade-in duration-1000">
            AUDIOVISUAL NA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              VELOCIDADE DO AGORA.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mb-12 z-10 leading-relaxed animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-200">
            Nascemos para encurtar a distância entre a ideia e o play. <br className="hidden md:block"/>
            Sem burocracia. Apenas fluxo e qualidade cinematográfica.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 z-10 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300">
            <Link href="/portfolio" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-neutral-200 transition-all hover:scale-105">
              VER TRABALHOS
            </Link>
            <Link href="/contato" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              INICIAR PROJETO
            </Link>
          </div>
        </section>

        {/* TRANSITION 1 */}
        <div className="w-full h-32 bg-gradient-to-b from-black to-white pointer-events-none" />

        {/* SESSÃO 2: CLIENTES */}
        <section className="py-6 bg-white overflow-hidden">
          <div className="max-w-full mx-auto">
            <p className="text-sm text-black font-bold uppercase tracking-widest mb-8 text-center">
              Quem confia no nosso olhar
            </p>
            <div className="flex overflow-hidden relative w-full group">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex animate-scroll min-w-full flex-shrink-0 justify-around items-center gap-10 px-10">
                {CLIENTS.map((client, index) => (
                  <div key={index} className="flex items-center justify-center w-32 md:w-48 h-20">
                    <img src={client.logo} alt={client.name} className="max-h-14 w-auto object-contain hover:scale-110 transition-transform duration-300" />
                  </div>
                ))}
              </div>
              <div className="flex animate-scroll min-w-full flex-shrink-0 justify-around items-center gap-10 px-10" aria-hidden="true">
                {CLIENTS.map((client, index) => (
                  <div key={`dup-${index}`} className="flex items-center justify-center w-32 md:w-48 h-20">
                    <img src={client.logo} alt={client.name} className="max-h-14 w-auto object-contain hover:scale-110 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRANSITION 2 */}
        <div className="w-full h-32 bg-gradient-to-b from-white to-black pointer-events-none" />

        {/* SESSÃO 3: O QUE FAZEMOS (INTERATIVA) */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* COLUNA ESQUERDA: LISTA INTERATIVA */}
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-8">
                CRIAMOS NARRATIVAS <br /> QUE PRENDEM.
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed mb-8 min-h-[60px]">
                {SERVICES[activeService].description}
              </p>
              
              <div className="space-y-4">
                {SERVICES.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveService(index)}
                    className={`w-full flex items-center gap-4 text-xl font-medium border-b border-white/10 pb-4 transition-all text-left group ${activeService === index ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    <span className={`w-2 h-2 rounded-full transition-all ${activeService === index ? 'bg-blue-500 scale-125' : 'bg-neutral-700'}`} />
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            {/* COLUNA DIREITA: PLAYER DINÂMICO */}
            <div className="relative aspect-square md:aspect-[4/5] lg:aspect-video rounded-3xl overflow-hidden border border-white/10 group cursor-pointer bg-neutral-900 shadow-2xl transition-all duration-500">
               
               {/* Fundo Dinâmico */}
               <div className={`absolute inset-0 bg-gradient-to-br from-neutral-800 to-black transition-all duration-500 ${activeService % 2 === 0 ? 'opacity-100' : 'opacity-80'}`}></div>
               
               {/* Overlay de Conteúdo */}
               <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-20">
                 <div className="flex justify-between items-start">
                   <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                     {SERVICES[activeService].tag}
                   </span>
                 </div>

                 <div>
                   <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-6 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:scale-110 transition-all duration-300">
                     <Play size={24} className="text-white fill-current ml-1"/>
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-white leading-none tracking-tighter">
                     {SERVICES[activeService].videoTitle}
                   </h3>
                 </div>
               </div>
            </div>

          </div>
        </section>

        {/* SESSÃO 4: ACADEMY TEASER */}
        <section className="py-32 bg-neutral-900/30 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-bold tracking-widest uppercase mb-6">
              LAMPEJO ACADEMY
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
              COMPARTILHAMOS <br /> O CÓDIGO FONTE.
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12">
              Não guardamos segredos. Acesse nossos cursos, LUTs e processos de trabalho na Lampejo Academy.
            </p>
            <Link 
              href="/academy" 
              className="inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-purple-400 hover:border-purple-400 transition-all text-lg"
            >
              EXPLORAR A ACADEMY 
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      
      {/* O FOOTER ESTÁ AQUI */}
      <Footer />
    </div>
  );
}