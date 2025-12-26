// app/academy/[slug]/page.tsx
import Navbar from "../../components/Navbar";
import { COURSES } from "../../lib/courses";
import Link from "next/link";
import { notFound } from "next/navigation";

// Essa função diz ao Next quais páginas criar
export async function generateStaticParams() {
  return COURSES.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CourseSalesPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Pega o slug da URL
  const { slug } = await params;

  // 2. Busca o curso correspondente no nosso "banco de dados"
  const course = COURSES.find((c) => c.slug === slug);

  // 3. Se não achar, manda para página 404
  if (!course) {
    notFound();
  }

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      <Navbar />

      <div className="pt-32 max-w-6xl mx-auto px-6">
        
        {/* Botão Voltar */}
        <Link href="/academy" className="text-sm text-neutral-500 hover:text-white mb-8 inline-block transition-colors">
          ← Voltar para Academy
        </Link>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
          
          {/* LADO ESQUERDO: Conteúdo */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Cabeçalho */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
                {course.type}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                {course.title}
              </h1>
              <p className="text-xl text-neutral-300 leading-relaxed">
                {course.shortDescription}
              </p>
            </div>

            {/* Video Player (Placeholder) */}
            <div className="aspect-video w-full bg-neutral-900 rounded-2xl border border-white/10 overflow-hidden relative group">
              {/* Trocamos o iframe real por uma imagem até você ter o video */}
              <iframe 
                className="w-full h-full"
                src={course.videoUrl} 
                title="Video do Curso"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Descrição Completa */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Sobre o Conteúdo</h3>
              <p className="text-neutral-400 leading-relaxed text-lg whitespace-pre-line">
                {course.fullDescription}
              </p>
            </div>

            {/* O que você vai aprender */}
            <div className="bg-neutral-900/30 border border-white/5 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6">O que está incluso:</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {course.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-neutral-300">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* LADO DIREITO: Card de Compra (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-neutral-900/80 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-center shadow-2xl shadow-blue-900/5">
              <p className="text-neutral-500 text-sm font-medium uppercase tracking-widest mb-2">Valor de Investimento</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-white block tracking-tighter">{course.price}</span>
                <span className="text-neutral-400 text-sm mt-2 block">{course.installments}</span>
              </div>

              <a 
                href={course.checkoutUrl}
                target="_blank"
                className="block w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-blue-500 hover:text-white transition-all transform hover:-translate-y-1 mb-4"
              >
                COMPRAR AGORA
              </a>

              <p className="text-xs text-neutral-500">
                Acesso imediato enviado por email.
                <br />Garantia de 7 dias.
              </p>
              
              <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-2 text-neutral-400 text-xs">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  Pagamento Seguro
                </div>
                <div className="flex items-center justify-center gap-2 text-neutral-400 text-xs">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Acesso Vitalício
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}