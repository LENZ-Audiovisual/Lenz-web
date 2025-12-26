'use client'; // Necessário para animações e controle de estado

import React from 'react';
import Navbar from "../components/Navbar";
import { useForm, ValidationError } from '@formspree/react';

export default function ContactPage() {
  // Configuração do Formspree
  // O hook gerencia o estado: se está enviando, se deu erro, ou se foi sucesso
  const [state, handleSubmit] = useForm("xojqvrep");

  return (
    <div className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      <Navbar />

      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* COLUNA DA ESQUERDA: Texto e Infos (Sempre visível) */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.9]">
                VAMOS CRIAR <br />
                <span className="text-neutral-500">ALGO ÉPICO?</span>
              </h1>
              <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
                Estamos prontos para ouvir sua ideia. Preencha o formulário ou entre em contato direto pelos canais abaixo.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-2">Contato Direto</h3>
                <a href="mailto:lampejo.rec@gmail.com" className="block text-2xl font-medium hover:text-blue-400 transition-colors">
                  lampejo.rec@gmail.com
                </a>
                
                <a 
                  href="https://wa.me/5561994079423" 
                  target="_blank"
                  className="block text-2xl font-medium hover:text-green-400 transition-colors mt-2"
                >
                  +55 61 9 9407-9423
                </a>
              </div>

              <div>
                <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-2">Localização</h3>
                <p className="text-xl text-white">Brasília, DF — Brasil</p>
                <p className="text-neutral-500">Atendendo em todo território nacional.</p>
              </div>
            </div>
          </div>

          {/* COLUNA DA DIREITA: Formulário ou Mensagem de Sucesso */}
          <div className="bg-neutral-900/30 p-8 md:p-10 rounded-3xl border border-white/5 backdrop-blur-sm min-h-[600px] flex flex-col justify-center">
            
            {/* LÓGICA: Se enviou com sucesso, mostra mensagem. Se não, mostra form. */}
            {state.succeeded ? (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 text-green-500 mb-6 border border-green-500/20">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Mensagem Recebida!</h3>
                <p className="text-neutral-400 text-lg leading-relaxed">
                  Obrigado pelo contato. Nossa equipe já recebeu sua notificação e retornaremos em breve.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-8 text-sm text-neutral-500 hover:text-white underline decoration-neutral-700 underline-offset-4"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Seu Nome</label>
                    <input 
                      id="nome"
                      name="nome"
                      type="text" 
                      placeholder="João Silva" 
                      required
                      className="w-full bg-transparent border-b border-neutral-700 py-3 text-lg focus:outline-none focus:border-white transition-colors placeholder:text-neutral-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Empresa (Opcional)</label>
                    <input 
                      id="empresa"
                      name="empresa"
                      type="text" 
                      placeholder="Sua Marca Ltda" 
                      className="w-full bg-transparent border-b border-neutral-700 py-3 text-lg focus:outline-none focus:border-white transition-colors placeholder:text-neutral-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Email Corporativo</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    placeholder="joao@empresa.com" 
                    required
                    className="w-full bg-transparent border-b border-neutral-700 py-3 text-lg focus:outline-none focus:border-white transition-colors placeholder:text-neutral-700"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm" />
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">No que podemos ajudar?</label>
                  <div className="flex flex-wrap gap-3">
                    {["Produção Publicitária", "Conteúdo Digital", "Institucional", "Cobertura de Evento", "Outro"].map((item) => (
                      <label key={item} className="cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="interesse" 
                          value={item} 
                          className="hidden peer" 
                        />
                        <div className="px-4 py-2 border border-neutral-700 rounded-full text-sm text-neutral-400 hover:border-neutral-500 peer-checked:bg-white peer-checked:text-black peer-checked:border-white transition-all">
                          {item}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Detalhes do Projeto</label>
                  <textarea 
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                    placeholder="Conte um pouco sobre o briefing, prazos ou referências..." 
                    required
                    className="w-full bg-transparent border-b border-neutral-700 py-3 text-lg focus:outline-none focus:border-white transition-colors placeholder:text-neutral-700 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={state.submitting}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl text-lg hover:bg-neutral-200 transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? "ENVIANDO..." : "ENVIAR MENSAGEM"}
                </button>

              </form>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}