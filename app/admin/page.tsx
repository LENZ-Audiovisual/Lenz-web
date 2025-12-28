"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Printer, Lock, DollarSign, TrendingUp, TrendingDown, FileText, MapPin, Calendar, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// --- TIPOS ---
interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

// Banco de logos (Mesmo do site)
const clientLogos: Record<string, string> = {
  "nic.br": "/nicbr.png",
  "cgi.br": "/cgibr.png",
  "safernet": "/safernet.png",
  "caadf": "/caadf.png",
  "oab/df": "/oabdf.png",
  "oab": "/oabdf.png",
  "estadão": "/estadao.png",
  "estadao": "/estadao.png",
  "hy produções": "/hy.png",
  "sem rótulo": "/semrotulo.png",
  "sem rotulo": "/semrotulo.png",
  "sinicon": "/sinicon.png"
};

export default function AdminPage() {
  // --- ESTADOS DE CONTROLE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"proposal" | "finance">("proposal");

  // --- ESTADOS DO ORÇAMENTO ---
  const [clientName, setClientName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [coverageDetails, setCoverageDetails] = useState(""); // O que vamos cobrir
  const [scope, setScope] = useState(""); // Equipe / Diárias
  const [deliverables, setDeliverables] = useState(""); // Entregáveis
  const [value, setValue] = useState("");

  // --- ESTADOS DO FINANCEIRO ---
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransDesc, setNewTransDesc] = useState("");
  const [newTransAmount, setNewTransAmount] = useState("");
  const [newTransType, setNewTransType] = useState<"income" | "expense">("income");

  // --- EFEITOS (Carregar dados salvos) ---
  useEffect(() => {
    const savedData = localStorage.getItem("lampejo_finances");
    if (savedData) {
      setTransactions(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("lampejo_finances", JSON.stringify(transactions));
    }
  }, [transactions]);

  // --- FUNÇÕES AUXILIARES ---
  const getClientLogo = (name: string) => {
    const key = name.toLowerCase().trim();
    return clientLogos[key] || null;
  };

  const handleLogin = () => {
    if (password === "lampejo2025") {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta");
    }
  };

  const addTransaction = () => {
    if (!newTransDesc || !newTransAmount) return;
    const newTrans: Transaction = {
      id: Date.now(),
      description: newTransDesc,
      amount: parseFloat(newTransAmount),
      type: newTransType,
      date: new Date().toLocaleDateString("pt-BR"),
    };
    setTransactions([newTrans, ...transactions]);
    setNewTransDesc("");
    setNewTransAmount("");
  };

  const removeTransaction = (id: number) => {
    const filtered = transactions.filter((t) => t.id !== id);
    setTransactions(filtered);
    if (filtered.length === 0) localStorage.removeItem("lampejo_finances");
  };

  const totalIncome = transactions.filter(t => t.type === "income").reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  const handlePrint = () => {
    window.print();
  };

  // --- TELA DE LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
        <div className="w-full max-w-sm bg-neutral-900 p-8 rounded-2xl border border-white/10 text-center">
          <Lock className="w-12 h-12 mx-auto text-purple-500 mb-6" />
          <h1 className="text-2xl font-bold mb-2">Área Restrita</h1>
          <p className="text-neutral-400 mb-6">Acesso exclusivo Lampejo</p>
          <input
            type="password"
            placeholder="Senha de acesso"
            className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            onClick={handleLogin}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            ENTRAR
          </button>
          <Link href="/" className="block mt-6 text-sm text-neutral-500 hover:text-white">Voltar para o site</Link>
        </div>
      </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      
      {/* NAVBAR */}
      <nav className="border-b border-white/10 bg-neutral-900 px-6 py-4 flex justify-between items-center print:hidden sticky top-0 z-50">
        <div className="font-bold text-xl tracking-tighter">LAMPEJO <span className="text-purple-500 text-xs align-top">ADMIN</span></div>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab("proposal")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === "proposal" ? "bg-white text-black" : "text-neutral-400 hover:text-white"}`}
          >
            GERADOR DE PROPOSTA
          </button>
          <button 
            onClick={() => setActiveTab("finance")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === "finance" ? "bg-white text-black" : "text-neutral-400 hover:text-white"}`}
          >
            FLUXO DE CAIXA
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="text-red-500 text-sm font-bold ml-4">SAIR</button>
        </div>
      </nav>

      {/* --- ABA 1: GERADOR DE PROPOSTA --- */}
      {activeTab === "proposal" && (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
          
          {/* FORMULÁRIO (Lateral Esquerda) */}
          <div className="w-full lg:w-1/3 p-6 overflow-y-auto border-r border-white/10 bg-neutral-900/50 print:hidden custom-scrollbar">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FileText className="text-purple-500" /> Detalhes do Projeto
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 uppercase font-bold">Cliente</label>
                  <input value={clientName} onChange={e => setClientName(e.target.value)} className="w-full bg-black border border-white/20 rounded p-3 mt-1 focus:border-purple-500 outline-none transition-colors" placeholder="Ex: NIC.br" />
                  {getClientLogo(clientName) && <p className="text-xs text-green-500 mt-1 flex items-center gap-1">✓ Logo encontrada no sistema</p>}
                </div>
                <div>
                  <label className="text-xs text-neutral-400 uppercase font-bold">Nome do Evento / Projeto</label>
                  <input value={projectName} onChange={e => setProjectName(e.target.value)} className="w-full bg-black border border-white/20 rounded p-3 mt-1 focus:border-purple-500 outline-none transition-colors" placeholder="Ex: Semana de Infraestrutura" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 uppercase font-bold">Data(s)</label>
                  <input value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full bg-black border border-white/20 rounded p-3 mt-1 focus:border-purple-500 outline-none" placeholder="15 a 19 de Dezembro" />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 uppercase font-bold">Local</label>
                  <input value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-black border border-white/20 rounded p-3 mt-1 focus:border-purple-500 outline-none" placeholder="Brasília - DF" />
                </div>
              </div>

              <div>
                <label className="text-xs text-neutral-400 uppercase font-bold">O que vamos cobrir? (Contexto)</label>
                <textarea rows={3} value={coverageDetails} onChange={e => setCoverageDetails(e.target.value)} className="w-full bg-black border border-white/20 rounded p-3 mt-1 focus:border-purple-500 outline-none" placeholder="Cobertura completa dos painéis, entrevistas e networking..." />
              </div>

              <div>
                <label className="text-xs text-neutral-400 uppercase font-bold">Escopo / Equipe (Diárias)</label>
                <textarea rows={3} value={scope} onChange={e => setScope(e.target.value)} className="w-full bg-black border border-white/20 rounded p-3 mt-1 focus:border-purple-500 outline-none" placeholder="- 5 diárias de captação&#10;- 1 Videomaker Sênior" />
              </div>

              <div>
                <label className="text-xs text-neutral-400 uppercase font-bold">Entregáveis (Lista Final)</label>
                <textarea rows={4} value={deliverables} onChange={e => setDeliverables(e.target.value)} className="w-full bg-black border border-white/20 rounded p-3 mt-1 focus:border-purple-500 outline-none" placeholder="- 1 Vídeo Resumo (Aftermovie)&#10;- 5 Cortes Virais" />
              </div>

              <div>
                <label className="text-xs text-neutral-400 uppercase font-bold">Investimento Total (R$)</label>
                <input value={value} onChange={e => setValue(e.target.value)} className="w-full bg-black border border-white/20 rounded p-3 mt-1 focus:border-purple-500 outline-none font-bold text-lg" placeholder="12.500,00" />
              </div>

              <button 
                onClick={handlePrint}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg mt-6 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <Printer size={20} />
                IMPRIMIR PROPOSTA
              </button>
            </div>
          </div>

          {/* VISUALIZAÇÃO DA FOLHA A4 (Lado Direito) */}
          <div className="flex-1 bg-neutral-800 p-8 overflow-y-auto flex justify-center custom-scrollbar">
            <div id="proposal-paper" className="bg-white text-black w-[210mm] min-h-[297mm] p-[15mm] shadow-2xl relative flex flex-col print:w-full print:h-full print:shadow-none print:m-0 print:p-[15mm]">
              
              {/* CABEÇALHO */}
              <div className="flex justify-between items-center border-b-2 border-black pb-8 mb-10">
                <div>
                  <h1 className="text-5xl font-extrabold tracking-tighter mb-1 uppercase">Lampejo</h1>
                  <p className="text-sm font-bold tracking-[0.3em] uppercase text-neutral-500">Audiovisual</p>
                </div>
                
                {/* LOGO DO CLIENTE (SE EXISTIR) */}
                {getClientLogo(clientName) ? (
                   <div className="relative w-32 h-16">
                     <img 
                       src={getClientLogo(clientName)!} 
                       alt="Logo Cliente" 
                       className="w-full h-full object-contain filter grayscale contrast-125" // Logo P&B para ficar chique
                     />
                   </div>
                ) : (
                  <div className="text-right">
                    <h2 className="text-2xl font-bold uppercase text-neutral-400">{clientName || "CLIENTE"}</h2>
                  </div>
                )}
              </div>

              {/* TÍTULO E INTRODUÇÃO */}
              <div className="mb-12">
                <div className="inline-block bg-black text-white text-xs font-bold px-3 py-1 mb-4 uppercase tracking-wider">
                  Proposta Comercial
                </div>
                <h3 className="text-4xl font-bold leading-tight mb-2 max-w-2xl">
                  {projectName || "Nome do Projeto"}
                </h3>
                <div className="flex gap-6 text-sm font-medium text-neutral-600 mt-4 border-l-4 border-black pl-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {eventDate || "Data a definir"}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {location || "Local a definir"}
                  </div>
                </div>
              </div>

              {/* CONTEÚDO PRINCIPAL (GRID) */}
              <div className="grid grid-cols-1 gap-10">
                
                {/* O QUE VAMOS COBRIR */}
                <section>
                  <h4 className="text-lg font-extrabold uppercase mb-4 flex items-center gap-2 border-b border-neutral-200 pb-2">
                    O Desafio & Cobertura
                  </h4>
                  <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap text-justify">
                    {coverageDetails || "Descrição da cobertura e dos objetivos do projeto..."}
                  </p>
                </section>

                {/* PROPOSTA / EQUIPE */}
                <section>
                  <h4 className="text-lg font-extrabold uppercase mb-4 flex items-center gap-2 border-b border-neutral-200 pb-2">
                    <Users size={18} /> Escopo & Equipe
                  </h4>
                  <div className="bg-neutral-50 p-6 rounded-lg border-l-4 border-neutral-300">
                    <div className="text-neutral-800 whitespace-pre-wrap leading-relaxed font-medium">
                      {scope || "- Configuração da equipe..."}
                    </div>
                  </div>
                </section>

                {/* ENTREGÁVEIS */}
                <section>
                  <h4 className="text-lg font-extrabold uppercase mb-4 flex items-center gap-2 border-b border-neutral-200 pb-2">
                    Entregáveis
                  </h4>
                  <div className="text-neutral-700 whitespace-pre-wrap leading-relaxed pl-4 list-disc marker:text-black">
                    {deliverables || "- Lista de vídeos a serem entregues..."}
                  </div>
                </section>

              </div>

              {/* INVESTIMENTO */}
              <div className="mt-auto pt-10">
                <div className="flex justify-between items-end bg-black text-white p-6 rounded-lg">
                  <div>
                    <p className="text-neutral-400 text-xs uppercase tracking-widest mb-1">Investimento Total</p>
                    <p className="text-xs text-neutral-500">*Validade: 7 dias corridos</p>
                  </div>
                  <div className="text-4xl font-bold tracking-tighter">
                    R$ {value || "0,00"}
                  </div>
                </div>
              </div>

              {/* RODAPÉ FISCAL (ATUALIZADO) */}
              <div className="mt-8 text-center border-t border-neutral-200 pt-6">
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider leading-relaxed font-medium">
                  LAMPEJO AUDIOVISUAL - 063.030.132/0001-86 <br />
                  LAGO SUL - BRASÍLIA/DF <br />
                  {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- ABA 2: FINANCEIRO --- */}
      {activeTab === "finance" && (
        <div className="p-6 max-w-5xl mx-auto animate-in fade-in">
           {/* CARDS */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-neutral-900 p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-2 text-neutral-400">
                <TrendingUp size={20} className="text-green-500" />
                <span className="text-sm font-bold uppercase">Entradas</span>
              </div>
              <div className="text-3xl font-bold text-green-500">
                R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-neutral-900 p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-2 text-neutral-400">
                <TrendingDown size={20} className="text-red-500" />
                <span className="text-sm font-bold uppercase">Saídas</span>
              </div>
              <div className="text-3xl font-bold text-red-500">
                R$ {totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-2 text-neutral-600">
                <DollarSign size={20} />
                <span className="text-sm font-bold uppercase">Saldo Atual</span>
              </div>
              <div className={`text-3xl font-bold ${balance >= 0 ? "text-black" : "text-red-600"}`}>
                R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* FORMULÁRIO */}
          <div className="bg-neutral-900 p-6 rounded-2xl border border-white/10 mb-8">
            <h3 className="text-lg font-bold mb-4">Novo Lançamento</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Descrição (ex: Pagamento Cliente X)" 
                className="flex-1 bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                value={newTransDesc}
                onChange={e => setNewTransDesc(e.target.value)}
              />
              <input 
                type="number" 
                placeholder="Valor (R$)" 
                className="w-full md:w-40 bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                value={newTransAmount}
                onChange={e => setNewTransAmount(e.target.value)}
              />
              <select 
                className="bg-black border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                value={newTransType}
                onChange={e => setNewTransType(e.target.value as "income" | "expense")}
              >
                <option value="income">Entrada (+)</option>
                <option value="expense">Saída (-)</option>
              </select>
              <button 
                onClick={addTransaction}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Plus size={20} /> Adicionar
              </button>
            </div>
          </div>

          {/* LISTA */}
          <div className="bg-neutral-900 rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-xs uppercase text-neutral-400 font-bold">
                <tr>
                  <th className="p-4">Data</th>
                  <th className="p-4">Descrição</th>
                  <th className="p-4">Valor</th>
                  <th className="p-4 text-center">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-neutral-400">{t.date}</td>
                    <td className="p-4 font-medium">{t.description}</td>
                    <td className={`p-4 font-bold ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                      {t.type === "expense" ? "- " : "+ "} 
                      R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-center">
                      <button onClick={() => removeTransaction(t.id)} className="text-neutral-500 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}