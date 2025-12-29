"use client";

import Navbar from "../components/Navbar";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* LADO ESQUERDO: Texto */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              VAMOS CRIAR <br/>
              <span className="text-purple-500">ALGO NOVO.</span>
            </h1>
            <p className="text-xl text-neutral-400 mb-12 leading-relaxed">
              Tem um projeto em mente? Quer saber mais sobre nossos processos? 
              Estamos prontos para ouvir e transformar sua ideia em frames.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center border border-white/10">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Email</p>
                  <a href="mailto:contato@lampejo.rec.br" className="text-lg font-bold hover:text-purple-400 transition-colors">contato@lampejo.rec.br</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center border border-white/10">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-neutral-500 tracking-widest">WhatsApp</p>
                  <a href="https://wa.me/5561994079423" target="_blank" className="text-lg font-bold hover:text-purple-400 transition-colors">+55 61 9 9407-9423</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center border border-white/10">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-neutral-500 tracking-widest">QG</p>
                  <p className="text-lg font-bold">Lago Sul, Brasília - DF</p>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: Formulário Simples */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Mande um oi.</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-neutral-500 mb-2">Nome</label>
                <input type="text" placeholder="Seu nome" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-purple-500 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-neutral-500 mb-2">Email</label>
                <input type="email" placeholder="seu@email.com" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-purple-500 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-neutral-500 mb-2">Mensagem</label>
                <textarea rows={4} placeholder="Conte um pouco sobre o projeto..." className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-purple-500 outline-none transition-colors resize-none" />
              </div>
              <button type="button" className="w-full bg-white text-black hover:bg-purple-500 hover:text-white py-4 rounded-lg font-bold tracking-widest transition-all uppercase">
                Enviar Mensagem
              </button>
            </form>
          </div>

        </div>
      </main>
      
      {/* Footer removido daqui pois já existe no layout global */}
    </div>
  );
}