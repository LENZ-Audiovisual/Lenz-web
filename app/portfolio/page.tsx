"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { X, PlayCircle } from "lucide-react";

// --- ÁREA DE EDIÇÃO ---
// Cole os links normais do navegador (YouTube ou Vimeo)
const projects = [
  {
    id: 1,
    title: "Tour pela semana de Infra 2025",
    category: "Publicidade",
    image: "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=2664&auto=format&fit=crop",
    link: "https://youtu.be/nowQ1VjKlHQ" // Agora aceita link curto!
  },
  {
    id: 2,
    title: "Documentário Sertão",
    category: "Cinema",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=2698&auto=format&fit=crop",
    link: "https://vimeo.com/76979871"
  },
  {
    id: 3,
    title: "Fashion Film Vogue",
    category: "Moda",
    image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=2670&auto=format&fit=crop",
    link: "https://www.youtube.com/watch?v=ScMrIvL85l4"
  }
];

export default function Portfolio() {
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  // Função INTELIGENTE que descobre o ID do vídeo em qualquer formato de link
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    // 1. Tenta YouTube (Link longo ou curto)
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);

    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`;
    }

    // 2. Tenta Vimeo
    if (url.includes("vimeo.com")) {
      const vimeoId = url.split(".com/")[1]?.split("/")[0];
      if (vimeoId) {
        return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
      }
    }

    return url;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 px-6 max-w-7xl mx-auto pb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">
          TRABALHOS <span className="text-neutral-600">SELECIONADOS</span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer relative overflow-hidden rounded-xl aspect-video"
              onClick={() => setCurrentVideo(project.link)}
            >
              {/* Imagem de Capa */}
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              
              {/* Overlay Escuro */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

              {/* Informações */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              </div>

              {/* Ícone de Play */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <PlayCircle className="w-8 h-8 text-white fill-current" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL DE VÍDEO (Player) */}
      {currentVideo && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          
          <button 
            onClick={() => setCurrentVideo(null)}
            className="absolute top-6 right-6 text-white hover:text-blue-500 transition-colors bg-white/10 p-2 rounded-full"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe 
              src={getEmbedUrl(currentVideo)} 
              className="w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}