import Navbar from "../components/Navbar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// --- LISTA DE ARTIGOS (13 ITENS) ---
const articles = [
  {
    id: 1,
    title: "O Futuro do Audiovisual com IA",
    category: "IA & Tecnologia",
    date: "20 DEZ 2025",
    description: "Como ferramentas generativas estão mudando a pré-produção, o roteiro e o fluxo criativo das grandes agências.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    slug: "futuro-ia"
  },
  {
    id: 2,
    title: "Bastidores: Projeto Neon",
    category: "Making Of",
    date: "18 DEZ 2025",
    description: "Um breakdown completo da iluminação e color grading do nosso último comercial automotivo.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    slug: "projeto-neon"
  },
  {
    id: 3,
    title: "Minimalismo na Edição",
    category: "Edição",
    date: "15 DEZ 2025",
    description: "Por que cortes secos e narrativas diretas estão dominando o mercado e retendo mais atenção.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44c?q=80&w=2670&auto=format&fit=crop",
    slug: "minimalismo"
  },
  {
    id: 4,
    title: "A Psicologia das Cores",
    category: "Color Grading",
    date: "12 DEZ 2025",
    description: "Como o teal & orange manipula emoções e por que você deveria quebrar essa regra às vezes.",
    image: "https://images.unsplash.com/photo-1533158388470-9a56699990c6?q=80&w=2588&auto=format&fit=crop",
    slug: "psicologia-cores"
  },
  {
    id: 5,
    title: "Sound Design Invisível",
    category: "Áudio",
    date: "10 DEZ 2025",
    description: "O som representa 70% da experiência. Aprenda técnicas de foley que elevam sua produção.",
    image: "https://images.unsplash.com/photo-1594433568633-8a962a93b482?q=80&w=2574&auto=format&fit=crop",
    slug: "sound-design"
  },
  {
    id: 6,
    title: "Narrativas Verticais",
    category: "Social Media",
    date: "08 DEZ 2025",
    description: "O desafio de contar histórias cinematográficas em 9:16 para TikTok e Reels.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop",
    slug: "videos-verticais"
  },
  {
    id: 7,
    title: "Drones FPV no Cinema",
    category: "Tendência",
    date: "05 DEZ 2025",
    description: "Como pilotos de drone estão substituindo gruas e helicópteros em cenas de ação complexas.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2670&auto=format&fit=crop",
    slug: "drones-fpv"
  },
  {
    id: 8,
    title: "Storytelling Corporativo",
    category: "Branding",
    date: "01 DEZ 2025",
    description: "Empresas não querem mais vídeos institucionais chatos. Elas querem manifestos.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
    slug: "storytelling-corporativo"
  },
  {
    id: 9,
    title: "Câmeras de Cinema vs. Mirrorless",
    category: "Equipamento",
    date: "28 NOV 2025",
    description: "A linha tênue entre uma Sony FX3 e uma ARRI Alexa em produções comerciais modernas.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2602&auto=format&fit=crop",
    slug: "cameras-cinema"
  },
  {
    id: 10,
    title: "O Poder do VFX Invisível",
    category: "Pós-Produção",
    date: "25 NOV 2025",
    description: "Limpeza de cena, extensão de set e os efeitos visuais que ninguém nota, mas fazem a diferença.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop",
    slug: "vfx-invisivel"
  },
  {
    id: 11,
    title: "Direção de Atores Não-Atores",
    category: "Direção",
    date: "22 NOV 2025",
    description: "Como extrair performances naturais de CEOs e colaboradores em vídeos empresariais.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop",
    slug: "direcao-atores"
  },
  {
    id: 12,
    title: "Iluminação Prática",
    category: "Fotografia",
    date: "20 NOV 2025",
    description: "Usando luzes do próprio cenário (abajures, neons, janelas) para criar profundidade realista.",
    image: "https://images.unsplash.com/photo-1550745165-90148454d808?q=80&w=2670&auto=format&fit=crop",
    slug: "iluminacao-pratica"
  },
  {
    id: 13,
    title: "A Revolução do 3D na Web",
    category: "Web Design",
    date: "15 NOV 2025",
    description: "Como sites imersivos com Three.js estão redefinindo portfólios de produtoras.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
    slug: "3d-web"
  }
];

export default function InsightsPage() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-purple-500/30">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            INSIGHTS
          </h1>
          <p className="text-neutral-400 text-xl max-w-2xl leading-relaxed">
            Pensamentos, bastidores e tecnologia aplicada ao audiovisual. 
            Nossa visão sobre o mercado e o futuro da imagem.
          </p>
        </div>

        {/* GRID DE ARTIGOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {articles.map((article) => (
            <Link 
              href={`/insights/${article.slug}`} 
              key={article.id}
              className="group block"
            >
              {/* Card Container */}
              <article className="flex flex-col h-full bg-neutral-900/30 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                
                {/* Imagem (Thumb) */}
                <div className="h-48 overflow-hidden relative">
                   <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                   <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                   />
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex flex-col flex-1">
                  
                  {/* Categoria e Data */}
                  <div className="flex justify-between items-center mb-4 text-xs font-bold tracking-widest uppercase">
                    <span className="text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-neutral-500">
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 leading-tight text-white group-hover:text-purple-300 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {article.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                    LER ARTIGO
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}