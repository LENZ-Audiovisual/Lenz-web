"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Importe o novo Footer
import { Mail, Phone, MapPin, ArrowRight, Instagram, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LADO ESQUERDO: INFOS */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                VAMOS CRIAR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                  O NOVO?
                </span>
              </h1>
              <p className="text-xl text-neutral-400 leading-relaxed max-w-md">
                Toda grande produção começa com uma conversa. Conte sua ideia, nós transformamos em filme.
              </p>
            </div>

            <div className="space-y-6">
              <ContactItem icon={Mail} title="Email" value="contato@lampejo.rec.br" link="mailto:contato@lampejo.rec.br" />
              <ContactItem icon={Phone} title="WhatsApp" value="+55 61 9 9407-9423" link="https://wa.me/5561994079423" />
              <ContactItem icon={MapPin} title="Estúdio" value="Lago Sul - Brasília, DF" />
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">Nossas Redes</p>
              <div className="flex gap-4">
                <SocialBtn icon={Instagram} link="#" />
                <SocialBtn icon={Linkedin} link="#" />
              </div>
            </div>
          </div>

          {/* LADO DIREITO: FORMULÁRIO BRIEFING */}
          <div className="bg-neutral-900/50 p-8 md:p-12 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-8">Briefing Rápido</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-neutral-500">Seu Nome</label>
                  <input type="text" className="w-full bg-black border border-white/20 rounded-lg p-4 focus:border-purple-500 outline-none transition-colors" placeholder="Nome" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-neutral-500">Empresa</label>
                  <input type="text" className="w-full bg-black border border-white/20 rounded-lg p-4 focus:border-purple-500 outline-none transition-colors" placeholder="@Empresa" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-neutral-500">Qual o objetivo?</label>
                <select className="w-full bg-black border border-white/20 rounded-lg p-4 focus:border-purple-500 outline-none transition-colors text-neutral-300">
                  <option>Institucional / Manifesto</option>
                  <option>Cobertura de Evento</option>
                  <option>Conteúdo para Redes (Reels)</option>
                  <option>Podcast / Videocast</option>
                  <option>Outro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-neutral-500">Mensagem / Detalhes</label>
                <textarea rows={4} className="w-full bg-black border border-white/20 rounded-lg p-4 focus:border-purple-500 outline-none transition-colors" placeholder="Conte um pouco sobre o projeto..." />
              </div>

              <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group">
                ENVIAR PROJETO <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}

function ContactItem({ icon: Icon, title, value, link }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
        <Icon className="text-purple-400" size={20} />
      </div>
      <div>
        <p className="text-xs font-bold uppercase text-neutral-500 mb-1">{title}</p>
        {link ? (
          <a href={link} className="text-lg font-medium hover:text-purple-400 transition-colors">{value}</a>
        ) : (
          <p className="text-lg font-medium">{value}</p>
        )}
      </div>
    </div>
  )
}

function SocialBtn({ icon: Icon, link }: any) {
  return (
    <a href={link} className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
      <Icon size={20} />
    </a>
  )
}