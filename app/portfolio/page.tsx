import Navbar from '@/app/components/Navbar';
import Link from 'next/link';

// --- ÁREA DE EDIÇÃO ---
// Adicione seus vídeos aqui. É só copiar e colar os blocos.
const projects = [
  {
    id: 1,
    title: "Campanha Nike 2025", // Nome do projeto
    category: "Publicidade", // Categoria
    image: "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=2664&auto=format&fit=crop", // Link da imagem de capa (pode ser link do Google ou arquivo local)
    link: "https://https://youtu.be/nowQ1VjkI3Q.com" // Link para onde vai ao clicar (Youtube/Vimeo)
  },
  {
    id: 2,
    title: "Documentário Sertão",
    category: "Cinema",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=2698&auto=format&fit=crop",
    link: "https://vimeo.com"
  },
  {
    id: 3,
    title: "Fashion Film Vogue",
    category: "Moda",
    image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?q=80&w=2670&auto=format&fit=crop",
    link: "https://instagram.com"
  },
  // Para adicionar mais, coloque uma vírgula acima e cole um novo bloco {}
];
// ----------------------

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-32 px-6 max-w-7xl mx-auto pb-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12">
          TRABALHOS <span className="text-gray-600">SELECIONADOS</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link 
              key={project.id} 
              href={project.link}
              target="_blank"
              className="group block"
            >
              {/* Card da Imagem */}
              <div className="relative aspect-video overflow-hidden rounded-sm mb-4 bg-gray-900 border border-white/10 group-hover:border-white/30 transition-all">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                
                {/* Ícone de Play (aparece no hover) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
              
              {/* Textos */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wide group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                    {project.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}