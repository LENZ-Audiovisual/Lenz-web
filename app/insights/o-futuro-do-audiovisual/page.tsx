import Link from 'next/link';

export default function ArtigoPage() {
  return (
    <main className="min-h-screen bg-black text-gray-300 py-20 px-6">
      <article className="max-w-3xl mx-auto">
        
        {/* Botão Voltar */}
        <div className="mb-8">
          <Link href="/insights" className="text-sm text-blue-500 hover:text-blue-400 transition-colors">
            &larr; Voltar para Insights
          </Link>
        </div>

        {/* Cabeçalho do Artigo */}
        <header className="mb-10 border-b border-zinc-800 pb-10">
          <span className="text-zinc-500 text-sm tracking-widest uppercase">Mercado</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight">
            O Futuro da Produção Audiovisual em Brasília
          </h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <time>26 Dez 2025</time>
            <span>•</span>
            <span>Eduardo Braz</span>
          </div>
        </header>

        {/* CONTEÚDO DO TEXTO AQUI */}
        <div className="space-y-6 text-lg leading-relaxed">
          
          <p>
            <strong className="text-white">Brasília sempre foi conhecida pela política e arquitetura</strong>, 
            mas o cenário audiovisual da capital está passando por uma transformação silenciosa e poderosa.
          </p>

          <p>
            Como filmmaker atuando na cidade, tenho percebido uma mudança na demanda dos clientes corporativos.
            Não se trata mais apenas de registrar eventos, mas de criar narrativas que conectem marcas a pessoas.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">A Era da Autenticidade</h2>
          
          <p>
            Empresas que antes buscavam vídeos institucionais engessados agora querem conteúdo dinâmico
            para redes sociais. A estética "perfeita demais" está dando lugar a uma estética "real", 
            que gera mais identificação.
          </p>

          <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-8 text-xl italic text-gray-400 bg-zinc-900/50 rounded-r">
            "O público não quer mais ver apenas a fachada da empresa, eles querem ver quem está construindo o prédio."
          </blockquote>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">O Próximo Passo</h2>
          
          <p>
            Para 2026, a tendência é a integração total entre vídeo e estratégia de vendas. 
            Produtoras que não entenderem de funil de vendas ficarão para trás.
          </p>
        </div>

      </article>
    </main>
  );
}