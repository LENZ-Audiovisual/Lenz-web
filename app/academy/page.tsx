import Link from "next/link";
import Navbar from "../components/Navbar";
import { COURSES } from "../lib/courses";

export default function AcademyPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <main className="pt-32 px-6 max-w-7xl mx-auto pb-20">
        
        {/* Cabeçalho */}
        <div className="mb-16 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            LAMPEJO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">ACADEMY</span>
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Não guardamos segredos. Aprenda o fluxo de trabalho, as técnicas e a visão por trás das nossas produções.
          </p>
        </div>

        {/* Grid de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
            <div key={course.id} className="group flex flex-col bg-neutral-900/40 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all hover:-translate-y-1">
              
              {/* Thumbnail (Simulada com Gradiente) */}
              <div className={`h-48 w-full bg-gradient-to-br ${course.thumbnailColor} relative`}>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                  {course.type}
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-neutral-400 text-sm mb-6 line-clamp-2">
                  {course.shortDescription}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xl font-bold text-white">
                    {course.price}
                  </span>
                  <Link 
                    href={`/academy/${course.slug}`}
                    className="bg-white text-black text-sm font-bold px-6 py-3 rounded-full hover:bg-neutral-200 transition-colors"
                  >
                    VER DETALHES
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}