import Link from "next/link";
import Navbar from "../components/Navbar"; // 1. Importando o Menu

const INSIGHTS = [
  {
    id: 1,
    title: "O Futuro do Audiovisual com IA",
    description: "Como ferramentas generativas estão mudando a pré-produção e o fluxo criativo.",
    date: "26 Dez 2025",
    slug: "o-futuro-do-audiovisual",
    tags: ["IA", "Tecnologia"]
  },
  {
    id: 2,
    title: "Bastidores: Projeto Neon",
    description: "Um breakdown completo da iluminação e color grading do último comercial.",
    date: "20 Dez 2025",
    slug: "bastidores-projeto-neon",
    tags: ["Making Of", "Color"]
  },
  {
    id: 3,
    title: "Minimalismo na Edição",
    description: "Por que cortes secos e narrativas diretas estão dominando o mercado.",
    date: "15 Dez 2025",
    slug: "minimalismo-na-edicao",
    tags: ["Edição", "Tendência"]
  }
];

export default function InsightsPage() {
  return (
    // Envolvemos tudo em uma div ou fragmento para ter a Navbar e o Main juntos
    <div className="bg-black min-h-screen"> 
      
      {/* 2. Adicionando o Menu no topo */}
      <Navbar /> 

      <main className="pt-32 px-6 max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
            INSIGHTS
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Pensamentos, bastidores e tecnologia aplicada ao audiovisual.
          </p>
        </div>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSIGHTS.map((post) => (
            <Link
              key={post.id}
              href={`/insights/${post.slug}`}
              className="group block bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl hover:border-neutral-600 transition-all hover:bg-neutral-900 hover:-translate-y-1"
            >
              <div className="flex gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs font-medium text-neutral-500 border border-neutral-800 px-2 py-1 rounded-full group-hover:text-white group-hover:border-neutral-600 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed line-clamp-3">
                {post.description}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-neutral-600 font-mono uppercase tracking-widest">
                  {post.date}
                </span>
                <span className="text-white text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  Ler →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}