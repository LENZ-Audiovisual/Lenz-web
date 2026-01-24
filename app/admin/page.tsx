"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { 
  LayoutDashboard, FileText, Settings, Plus, 
  Trash2, Printer, CheckCircle, 
  ArrowUpRight, ArrowDownRight, DollarSign, 
  ChevronLeft, LogOut, Lock, Users, Globe, Briefcase, Link, MessageSquare, Upload, Star, FileCheck, TrendingUp, Camera, Box, Database
} from "lucide-react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import Navbar from "../components/Navbar";

// ============================================================================
// 1. CONFIGURAÇÕES
// ============================================================================
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const LOGO_DB: Record<string, string> = {
  "nic": "/nicbr.png", "cgi": "/nicbr.png", "estadão": "/estadao.png",
  "threads": "/threads.png", "oab": "/oabdf.png", "caadf": "/caadf.png",
};

const MESES_FULL = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const CATEGORIAS_EQUIPAMENTO = [
  "Câmeras & Corpos", "Lentes & Óticas", "Iluminação & Grip", "Áudio & Microfones", 
  "Drones & Aéreos", "Estabilizadores & Gimbals", "Tripés & Suportes", 
  "Cabos & Conectividade", "Mídia & Armazenamento", "Computadores & Edição", 
  "Live Streaming & Switchers", "Cases & Transporte"
];

const formatarDataSimples = (dataStr: string) => {
  if (!dataStr) return "--";
  const [ano, mes, dia] = dataStr.split("-");
  return `${dia}/${mes}/${ano}`;
};

// ============================================================================
// 2. COMPONENTES UI
// ============================================================================
function NavButton({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium w-full text-left ${active ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-neutral-500 hover:bg-white/5 hover:text-white'}`}>
      {icon} <span>{label}</span>
    </button>
  );
}

function KPICard({ title, value, customValue, color, icon, bg = "bg-[#0f0f0f]" }: any) {
  return (
    <div className={`${bg} border border-white/5 p-6 rounded-[32px] flex flex-col justify-between aspect-video relative overflow-hidden group`}>
      <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <div className="flex justify-between items-center text-neutral-400 text-[10px] font-black uppercase tracking-widest relative z-10">{title} {icon}</div>
      <p className={`text-2xl font-black tracking-tighter relative z-10 ${color}`}>{customValue || (value ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "R$ 0,00")}</p>
    </div>
  );
}

function LoginView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert("Credenciais Inválidas");
        else window.location.reload();
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-8">
            <form onSubmit={handleLogin} className="w-full max-w-sm bg-[#0f0f0f] border border-white/10 p-12 rounded-[48px] space-y-6 shadow-2xl relative overflow-hidden text-white">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-600" />
                <div className="text-center mb-10"><Lock className="mx-auto text-purple-500 mb-6" size={48} /><h2 className="font-black uppercase tracking-[0.3em] text-xl">Lampejo Hub</h2></div>
                <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none focus:border-purple-500 text-white font-bold" required />
                <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none focus:border-purple-500 text-white font-bold" required />
                <button disabled={loading} className="w-full bg-purple-600 text-white font-black py-5 rounded-2xl tracking-[0.2em] uppercase text-xs shadow-lg active:scale-95 transition-all">{loading ? "Validando..." : "Entrar"}</button>
            </form>
        </div>
    );
}

// ============================================================================
// 3. TELAS (VIEWS)
// ============================================================================

function DashboardView({ propostas, financeiro, clientes, projetos }: any) {
    const stats = useMemo(() => {
      const totalAprovado = propostas.filter((p:any) => p.status === 'aprovada').reduce((acc:any, p:any) => acc + (p.itens?.reduce((a:any, i:any) => a + (Number(i.qtd) * Number(i.valor)), 0) || 0), 0);
      const entradas = financeiro.filter((t:any) => t.tipo === 'entrada').reduce((acc:any, t:any) => acc + Number(t.valor), 0);
      const saidas = financeiro.filter((t:any) => t.tipo === 'saida').reduce((acc:any, t:any) => acc + Number(t.valor), 0);
      return { totalAprovado, saldo: entradas - saidas, totalClientes: clientes.length, ativos: projetos.filter((p:any) => p.status !== 'Finalizado').length };
    }, [propostas, financeiro, clientes, projetos]);

    const chartData = useMemo(() => {
        const last6 = Array.from({length: 6}, (_, i) => {
            const d = new Date(); d.setMonth(d.getMonth() - i); return d.toISOString().slice(0, 7);
        }).reverse();
        return last6.map(mesAno => {
            const ent = financeiro.filter((t:any) => t.data.startsWith(mesAno) && t.tipo === 'entrada').reduce((a:any, b:any) => a + Number(b.valor), 0);
            const sai = financeiro.filter((t:any) => t.data.startsWith(mesAno) && t.tipo === 'saida').reduce((a:any, b:any) => a + Number(b.valor), 0);
            return { name: mesAno.split('-')[1], entradas: ent, saidas: sai };
        });
    }, [financeiro]);

    const clientData = useMemo(() => {
        const map = new Map();
        // AQUI ESTAVA O ERRO: Adicionado (p: any) explicitamente
        propostas.filter((p: any) => p.status === 'aprovada').forEach((p: any) => {
            const total = p.itens?.reduce((a:any, i:any) => a + (Number(i.qtd) * Number(i.valor)), 0) || 0;
            map.set(p.cliente, (map.get(p.cliente) || 0) + total);
        });
        return Array.from(map, ([name, value]) => ({ name, value })).sort((a: any, b: any) => b.value - a.value).slice(0, 5);
    }, [propostas]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20 text-white">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Intelligence Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPICard title="Receita Aprovada" value={stats.totalAprovado} color="text-green-400" icon={<TrendingUp size={24}/>} />
            <KPICard title="Saldo em Caixa" value={stats.saldo} color="text-white" bg="bg-purple-600 shadow-purple-500/20" icon={<DollarSign size={24}/>} />
            <KPICard title="Projetos Ativos" customValue={stats.ativos.toString()} color="text-blue-400" icon={<Briefcase size={24}/>} />
            <KPICard title="Base Clientes" customValue={stats.totalClientes.toString()} color="text-purple-400" icon={<Users size={24}/>} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[40px] shadow-2xl h-[400px]">
                  <h3 className="text-[10px] font-black uppercase text-neutral-500 mb-8 tracking-widest">Fluxo de Caixa (6 meses)</h3>
                  <ResponsiveContainer width="100%" height="90%">
                      <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                          <XAxis dataKey="name" stroke="#444" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{background: '#000', border: '1px solid #222', borderRadius: '10px'}} />
                          <Area type="monotone" dataKey="entradas" stroke="#9333ea" fill="#9333ea20" strokeWidth={3} />
                          <Area type="monotone" dataKey="saidas" stroke="#ef4444" fill="transparent" strokeWidth={2} />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
              <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[40px] shadow-2xl h-[400px]">
                  <h3 className="text-[10px] font-black uppercase text-neutral-500 mb-8 tracking-widest">Top 5 Faturamento Clientes</h3>
                  <ResponsiveContainer width="100%" height="90%">
                      <BarChart data={clientData} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" stroke="#fff" fontSize={10} fontWeight="black" width={80} axisLine={false} tickLine={false} />
                          <Tooltip cursor={{fill: '#222'}} contentStyle={{ background: '#000', border: '1px solid #333', borderRadius: '15px' }} />
                          <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                              {clientData.map((_: any, index: number) => (
                                  <Cell key={`cell-${index}`} fill={index === 0 ? '#9333ea' : '#333'} />
                              ))}
                          </Bar>
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>
        </div>
    );
}

function ClientesView({ clientes, refresh, session }: any) {
    const [editing, setEditing] = useState<any>(null);
    const [uploading, setUploading] = useState(false);
    async function handleFileUpload(e: any) {
        const file = e.target.files[0]; if (!file) return; setUploading(true);
        const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
        await supabase.storage.from('logos').upload(`logos/${fileName}`, file);
        const { data } = supabase.storage.from('logos').getPublicUrl(`logos/${fileName}`);
        setEditing({ ...editing, logo_url: data.publicUrl }); setUploading(false);
    }
    async function handleSave() {
        if (!editing.nome_fantasia) return alert("Nome vazio");
        const { id, ...data } = editing;
        const res = editing.id === 'new' ? await supabase.from('clientes').insert([{ ...data, user_id: session.user.id }]) : await supabase.from('clientes').update(data).eq('id', editing.id);
        if (res.error) alert(res.error.message); else { setEditing(null); refresh(); }
    }
    if (editing) return (
        <div className="max-w-4xl mx-auto space-y-6 text-white"><button onClick={() => setEditing(null)} className="text-neutral-500 flex items-center gap-2"><ChevronLeft size={16}/> Voltar</button>
            <div className="bg-[#0f0f0f] p-10 rounded-[48px] border border-white/5 space-y-8 shadow-2xl">
                <input value={editing.nome_fantasia || ""} onChange={e => setEditing({...editing, nome_fantasia: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white" placeholder="Nome Fantasia" />
                <input value={editing.endereco || ""} onChange={e => setEditing({...editing, endereco: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white" placeholder="Endereço" />
                <div className="w-full h-32 bg-black border border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                    {editing.logo_url ? <img src={editing.logo_url} className="h-full w-full object-contain p-4" /> : <Upload className="text-neutral-500" />}
                    <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <div className="absolute bottom-0 w-full bg-purple-600 text-white text-[8px] font-black text-center py-1 opacity-0 group-hover:opacity-100 transition-all">{uploading ? "SUBINDO..." : "CLIQUE PARA TROCAR LOGO"}</div>
                </div>
                <button onClick={handleSave} className="w-full bg-purple-600 text-white font-black py-5 rounded-3xl">Salvar CRM</button>
            </div>
        </div>
    );
    return (<div className="space-y-8"><div className="flex justify-between items-center text-white"><h1 className="text-4xl font-black tracking-tighter uppercase">Clientes</h1><button onClick={() => setEditing({id:'new', nome_fantasia:''})} className="bg-white text-black px-8 py-4 rounded-3xl font-black uppercase text-[10px]"><Plus size={18}/> Novo Cliente</button></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">{clientes.map((c:any) => (<div key={c.id} className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[40px] shadow-xl hover:border-purple-500/50 transition-all"><div className="flex justify-between items-start mb-6"><div className="w-16 h-16 bg-white/5 rounded-2xl p-3 flex items-center justify-center border border-white/5">{c.logo_url ? <img src={c.logo_url} className="max-w-full max-h-full object-contain" /> : <Globe className="text-neutral-700" />}</div><span className="text-[8px] font-black uppercase text-purple-400 bg-purple-900/10 px-2 py-1 rounded">Ativo</span></div><h3 className="text-xl font-black uppercase tracking-tighter mb-1">{c.nome_fantasia}</h3><p className="text-[10px] text-neutral-500 font-bold uppercase mb-6 truncate">{c.endereco || "Sem endereço"}</p><button onClick={() => setEditing(c)} className="w-full bg-white/5 py-3 rounded-xl hover:bg-white/10 text-xs font-bold text-white transition-all">Editar Ficha</button></div>))}</div></div>);
}

function EquipamentosView({ equipamentos, refresh, session }: any) {
    const [editing, setEditing] = useState<any>(null);
    const stats = useMemo(() => {
        const totalItens = equipamentos.reduce((acc: number, e: any) => acc + (Number(e.quantidade) || 1), 0);
        const valorPatrimonio = equipamentos.reduce((acc: number, e: any) => acc + (Number(e.valor_compra) * (Number(e.quantidade) || 1)), 0);
        return { totalItens, valorPatrimonio };
    }, [equipamentos]);

    async function handleSave() {
        if (!editing.nome) return alert("Nome obrigatório");
        const { id, ...data } = editing;
        const res = editing.id === 'new' 
            ? await supabase.from('equipamentos').insert([{ ...data, user_id: session.user.id }]) 
            : await supabase.from('equipamentos').update(data).eq('id', editing.id);
        if (res.error) alert(res.error.message); else { setEditing(null); refresh(); }
    }

    if (editing) return (
        <div className="max-w-2xl mx-auto space-y-6 text-white animate-in slide-in-from-right duration-300">
            <button onClick={() => setEditing(null)} className="text-neutral-500 flex items-center gap-2"><ChevronLeft size={16}/> Voltar</button>
            <div className="bg-[#0f0f0f] p-10 rounded-[48px] border border-white/5 space-y-6 shadow-2xl">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Ficha Técnica</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <select value={editing.categoria || "Geral"} onChange={e => setEditing({...editing, categoria: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white outline-none">
                            <option value="Geral">Categoria...</option>
                            {CATEGORIAS_EQUIPAMENTO.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <input value={editing.nome || ""} onChange={e => setEditing({...editing, nome: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white outline-none" placeholder="Nome do Equipamento" />
                    </div>
                    <input value={editing.marca_modelo || ""} onChange={e => setEditing({...editing, marca_modelo: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white outline-none" placeholder="Marca / Modelo" />
                    <input value={editing.n_serie || ""} onChange={e => setEditing({...editing, n_serie: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white outline-none" placeholder="Número de Série" />
                    <div className="grid grid-cols-3 gap-4">
                        <input type="number" value={editing.quantidade || ""} onChange={e => setEditing({...editing, quantidade: Number(e.target.value)})} className="bg-black border border-white/10 rounded-2xl p-4 text-sm text-white outline-none" placeholder="Qtd" />
                        <input type="number" value={editing.valor_compra || ""} onChange={e => setEditing({...editing, valor_compra: Number(e.target.value)})} className="bg-black border border-white/10 rounded-2xl p-4 text-sm text-white outline-none" placeholder="Valor Unit (R$)" />
                        <select value={editing.status || "Disponível"} onChange={e => setEditing({...editing, status: e.target.value})} className="bg-black border border-white/10 rounded-2xl p-4 text-sm text-white outline-none">
                            <option value="Disponível">Disponível</option><option value="Em Uso">Em Uso</option><option value="Manutenção">Manutenção</option>
                        </select>
                    </div>
                </div>
                <button onClick={handleSave} className="w-full bg-purple-600 text-white font-black py-5 rounded-3xl uppercase text-xs shadow-xl transition-all hover:scale-[1.02]">Salvar no Inventário</button>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 text-white">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase font-white">Inventário</h1>
                    <p className="text-neutral-500 text-sm mt-1">Patrimônio: <strong className="text-green-400">{stats.valorPatrimonio.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</strong> • {stats.totalItens} Itens</p>
                </div>
                <button onClick={() => setEditing({id:'new', nome:'', status:'Disponível', quantidade: 1, categoria: 'Geral'})} className="bg-white text-black px-8 py-4 rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-xl flex items-center gap-2"><Plus size={18}/> Novo Item</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipamentos.map((e: any) => (
                    <div key={e.id} className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[40px] shadow-2xl flex flex-col h-full hover:border-purple-500/50 transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10"><Box size={100}/></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="p-3 bg-white/5 rounded-2xl text-purple-400"><Camera size={24}/></div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-wider ${e.status === 'Disponível' ? 'bg-green-500/20 text-green-400' : e.status === 'Manutenção' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{e.status}</span>
                                <span className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded">{e.categoria || 'Geral'}</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-black uppercase text-white tracking-tight leading-none mb-1 relative z-10">{e.nome}</h3>
                        <p className="text-xs text-neutral-500 mb-6 uppercase tracking-widest relative z-10">{e.marca_modelo || 'Genérico'}</p>
                        
                        <div className="mt-auto pt-6 border-t border-white/5 relative z-10">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <p className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Valor Unitário</p>
                                    <p className="text-sm font-black text-white">{Number(e.valor_compra).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Qtd</p>
                                    <p className="text-xl font-black text-white">{e.quantidade || 1}</p>
                                </div>
                            </div>
                            <button onClick={() => setEditing(e)} className="w-full bg-white/5 py-3 rounded-xl hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all">Gerenciar Item</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function EquipeView({ equipe, refresh, session }: any) {
    const [editing, setEditing] = useState<any>(null);
    async function handleSave() {
        const { id, ...data } = editing;
        const res = editing.id === 'new' ? await supabase.from('equipe').insert([{ ...data, user_id: session.user.id }]) : await supabase.from('equipe').update(data).eq('id', editing.id);
        if (res.error) alert(res.error.message); else { setEditing(null); refresh(); }
    }
    if (editing) return (
        <div className="max-w-2xl mx-auto space-y-6 text-white"><button onClick={() => setEditing(null)} className="text-neutral-500 flex items-center gap-2"><ChevronLeft size={16}/> Voltar</button>
            <div className="bg-[#0f0f0f] p-10 rounded-[48px] border border-white/5 space-y-6 shadow-2xl text-white font-white">
                <input value={editing.nome || ""} onChange={e => setEditing({...editing, nome: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white" placeholder="Nome" />
                <input value={editing.funcao || ""} onChange={e => setEditing({...editing, funcao: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white" placeholder="Função" />
                <input type="number" value={editing.valor_diaria || ""} onChange={e => setEditing({...editing, valor_diaria: Number(e.target.value)})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white" placeholder="Valor Diária" />
                <input value={editing.whatsapp || ""} onChange={e => setEditing({...editing, whatsapp: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white" placeholder="WhatsApp" />
                <button onClick={handleSave} className="w-full bg-purple-600 text-white font-black py-5 rounded-3xl uppercase text-xs">Salvar Talento</button>
            </div>
        </div>
    );
    // LAYOUT RICO RESTAURADO PARA EQUIPE
    return (
        <div className="space-y-8 text-white">
            <div className="flex justify-between items-center text-white"><h1 className="text-4xl font-black tracking-tighter uppercase">Equipe</h1><button onClick={() => setEditing({id:'new', nome:''})} className="bg-white text-black px-8 py-4 rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-xl"><Plus size={18}/> Novo Talento</button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipe.map((e: any) => (
                    <div key={e.id} className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[40px] group hover:border-purple-500/50 transition-all flex flex-col shadow-2xl relative overflow-hidden h-full justify-between">
                        <div className="flex justify-between mb-6 relative z-10">
                            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-500/30">{(e.nome && e.nome[0]) ? e.nome[0] : "?"}</div>
                            <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full h-fit">{e.funcao || "Freelancer"}</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-white relative z-10">{e.nome}</h3>
                            <p className="text-xs text-neutral-500 mb-8 relative z-10">Diária Base: <span className="text-green-400 font-bold">{e.valor_diaria ? Number(e.valor_diaria).toLocaleString('pt-BR', {style:'currency', currency:'BRL'}) : 'R$ 0,00'}</span></p>
                        </div>
                        <div className="flex gap-2 mt-auto relative z-10">
                            {e.whatsapp && <a href={`https://wa.me/${e.whatsapp.replace(/\D/g,'')}`} target="_blank" className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all"><MessageSquare size={18}/></a>}
                            {e.portfolio_url && <a href={e.portfolio_url} target="_blank" className="p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all"><Link size={18}/></a>}
                            <button onClick={() => setEditing(e)} className="p-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all ml-auto"><Settings size={18}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProjetosView({ projetos, clientes, refresh, session }: any) {
    const [editing, setEditing] = useState<any>(null);
    async function handleSave() {
        const { id, clientes, ...data } = editing;
        const res = editing.id === 'new' ? await supabase.from('projetos').insert([{ ...data, user_id: session.user.id }]) : await supabase.from('projetos').update(data).eq('id', editing.id);
        if (res.error) alert(res.error.message); else { setEditing(null); refresh(); }
    }
    if (editing) return (
        <div className="max-w-2xl mx-auto space-y-6 text-white"><button onClick={() => setEditing(null)} className="text-neutral-500 flex items-center gap-2"><ChevronLeft size={16}/> Voltar</button>
            <div className="bg-[#0f0f0f] p-10 rounded-[48px] border border-white/5 space-y-6 shadow-2xl text-white">
                <input value={editing.nome || ""} onChange={e => setEditing({...editing, nome: e.target.value})} className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm text-white" placeholder="Projeto" />
                <button onClick={handleSave} className="w-full bg-purple-600 text-white font-black py-5 rounded-3xl uppercase text-xs">Salvar Projeto</button>
            </div>
        </div>
    );
    return (<div className="space-y-8 text-white"><div className="flex justify-between items-center text-white font-white"><h1 className="text-4xl font-black tracking-tighter uppercase font-white text-white font-white">Projetos</h1><button onClick={() => setEditing({id:'new', nome:''})} className="bg-white text-black px-8 py-4 rounded-3xl font-black uppercase text-[10px] tracking-widest"><Plus size={18}/> Novo Projeto</button></div><div className="bg-[#0f0f0f] border border-white/5 rounded-[40px] overflow-hidden text-white font-white"><table className="w-full text-left text-sm"><tbody>{projetos.map((p:any) => (<tr key={p.id}><td className="p-6">{p.nome}</td></tr>))}</tbody></table></div></div>);
}

function DocumentosView({ documentos, clientes, projetos, refresh, session, onPrint }: any) {
    const [editing, setEditing] = useState<any>(null);
    const contratoTemplate = (cli: any, proj: any) => `CONTRATO DE PRESTAÇÃO DE SERVIÇOS AUDIOVISUAIS\n\nCONTRATADA: LAMPEJO AUDIOVISUAL\nCONTRATANTE: ${cli?.razao_social || cli?.nome_fantasia}\n\nOBJETO: ${proj?.nome || '___'}`;
    async function handleSave() { const { id, clientes, projetos, ...data } = editing; const res = editing.id === 'new' ? await supabase.from('documentos').insert([{ ...data, user_id: session.user.id }]) : await supabase.from('documentos').update(data).eq('id', editing.id); if (res.error) alert(res.error.message); else { setEditing(null); refresh(); } }
    if (editing) return (
        <div className="max-w-4xl mx-auto space-y-6 text-white"><button onClick={() => setEditing(null)} className="text-neutral-500 flex items-center gap-2"><ChevronLeft size={16}/> Voltar</button>
            <div className="bg-[#0f0f0f] p-10 rounded-[48px] border border-white/5 space-y-6 shadow-2xl text-white font-white">
                <textarea value={editing.conteudo || ""} onChange={e => setEditing({...editing, conteudo: e.target.value})} rows={12} className="w-full bg-black border border-white/10 rounded-2xl p-6 text-xs font-mono text-white outline-none" />
                <button onClick={handleSave} className="w-full bg-purple-600 text-white font-black py-5 rounded-3xl uppercase text-xs shadow-xl transition-all">Salvar</button>
            </div>
        </div>
    );
    return (<div className="space-y-8 text-white"><h1 className="text-4xl font-black tracking-tighter uppercase">Jurídico</h1><button onClick={() => setEditing({id:'new', conteudo:''})} className="bg-white text-black px-8 py-4 rounded-3xl font-black uppercase text-[10px] shadow-xl"><Plus size={18}/> Novo Doc</button></div>);
}

function FinanceiroView({ financeiro, refresh, session, onPrint, equipamentos }: any) {
    const [mesAtivo, setMesAtivo] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
    const [anoAtivo, setAnoAtivo] = useState(new Date().getFullYear().toString());
    const [novo, setNovo] = useState({ descricao: '', valor: 0, tipo: 'saida', data: new Date().toISOString().slice(0, 10) });
    
    // Cálculo do Patrimônio (Soma de todos os equipamentos)
    const valorPatrimonio = useMemo(() => {
        return equipamentos.reduce((acc: number, item: any) => acc + (Number(item.valor_compra) * (Number(item.quantidade) || 1)), 0);
    }, [equipamentos]);

    const dataFiltro = `${anoAtivo}-${mesAtivo}`;
    const filtradas = useMemo(() => financeiro.filter((t: any) => t.data.startsWith(dataFiltro)), [financeiro, dataFiltro]);
    const resumo = useMemo(() => { 
        const ent = filtradas.filter((t:any) => t.tipo === 'entrada').reduce((a:any, b:any) => a + Number(b.valor), 0);
        const sai = filtradas.filter((t:any) => t.tipo === 'saida').reduce((a:any, b:any) => a + Number(b.valor), 0);
        return { ent, sai, sal: ent - sai };
    }, [filtradas]);

    async function addTransacao() { if (!novo.descricao || novo.valor <= 0) return alert("Faltam dados"); const { error } = await supabase.from('financeiro').insert([{ user_id: session.user.id, descricao: novo.descricao, valor: novo.valor, tipo: novo.tipo, data: novo.data }]); if (error) alert(error.message); else { setNovo({ ...novo, descricao: '', valor: 0 }); refresh(); } }
    
    return (
      <div className="space-y-8 animate-in fade-in duration-500 text-white font-white">
        <div className="flex justify-between items-end text-white text-white"><div><h1 className="text-4xl font-black tracking-tighter uppercase font-white text-white">Financeiro & Valuation</h1><p className="text-neutral-500 text-sm italic font-white text-white font-white">Gestão Financeira Global.</p></div><button onClick={() => onPrint({ mes: dataFiltro, entradas: resumo.ent, saidas: resumo.sai, itens: filtradas })} className="p-4 bg-[#0f0f0f] border border-white/10 rounded-2xl text-purple-400 hover:text-white transition-all"><Printer size={24}/></button></div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-white">
            <div className="bg-[#0f0f0f] p-8 rounded-[32px] border border-white/5 text-green-400"><p className="text-[10px] font-black uppercase mb-2">Entradas (Mês)</p><p className="text-2xl font-black">{resumo.ent.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</p></div>
            <div className="bg-[#0f0f0f] p-8 rounded-[32px] border border-white/5 text-red-400"><p className="text-[10px] font-black uppercase mb-2">Saídas (Mês)</p><p className="text-2xl font-black">{resumo.sai.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</p></div>
            <div className="bg-purple-600 p-8 rounded-[32px] text-white shadow-xl shadow-purple-500/20 font-white font-white"><p className="text-[10px] font-black uppercase mb-2 opacity-60">Saldo Líquido</p><p className="text-2xl font-black">{resumo.sal.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</p></div>
            {/* NOVO CARD: PATRIMÔNIO E VALUATION */}
            <div className="bg-[#0f0f0f] p-8 rounded-[32px] border border-white/5 text-blue-400 relative overflow-hidden">
                <div className="absolute right-0 top-0 p-4 opacity-10"><Database size={60}/></div>
                <p className="text-[10px] font-black uppercase mb-2 relative z-10">Patrimônio (Ativos)</p>
                <p className="text-2xl font-black relative z-10">{valorPatrimonio.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</p>
            </div>
        </div>

        <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-[32px] flex flex-wrap gap-4 items-end shadow-2xl text-white font-white"><div className="flex-1 min-w-[200px] text-white font-white"><label className="text-[10px] font-black text-neutral-500 mb-2 block uppercase tracking-widest text-white font-white">Descrição</label><input value={novo.descricao} onChange={e => setNovo({...novo, descricao: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none" /></div><div className="w-32 text-white font-white"><label className="text-[10px] font-black text-neutral-500 mb-2 block uppercase tracking-widest text-white font-white">Valor</label><input type="number" value={novo.valor} onChange={e => setNovo({...novo, valor: Number(e.target.value)})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white" /></div><div className="w-32 text-white font-white font-white"><label className="text-[10px] font-black text-neutral-500 mb-2 block uppercase tracking-widest text-white font-white font-white">Tipo</label><select value={novo.tipo} onChange={e => setNovo({...novo, tipo: e.target.value as any})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-purple-500"><option value="entrada">Entrada</option><option value="saida">Saída</option></select></div><button onClick={addTransacao} className="bg-white text-black font-black px-8 h-12 rounded-xl transition-all active:scale-95 shadow-xl uppercase text-[10px]">Lançar</button></div>
        <div className="bg-[#0f0f0f] border border-white/5 rounded-[32px] overflow-hidden text-white font-white font-white font-white font-white font-white font-white font-white font-white"><table className="w-full text-left text-sm text-white font-white font-white font-white font-white font-white font-white font-white font-white font-white"><thead className="bg-white/5 text-[10px] font-black uppercase text-neutral-500 text-white font-white font-white"><tr><th className="p-6">Data</th><th className="p-6">Descrição</th><th className="p-6 text-right font-white">Valor</th><th className="p-6"></th></tr></thead><tbody className="divide-y divide-white/5 text-white font-white font-white">{filtradas.map((t:any) => (<tr key={t.id} className="hover:bg-white/5 text-white font-white"><td className="p-6 text-xs font-mono text-neutral-500 font-white font-white">{formatarDataSimples(t.data)}</td><td className="p-6 font-bold uppercase text-white font-white font-white font-white font-white">{t.descricao}</td><td className={`p-6 text-right font-black ${t.tipo === 'entrada' ? 'text-green-400' : 'text-red-400'}`}>{Number(t.valor).toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</td><td className="p-6 text-right"><button onClick={async () => { if(confirm("Deletar?")){ await supabase.from('financeiro').delete().eq('id', t.id); refresh(); } }} className="text-neutral-600 hover:text-red-500 transition-all font-white"><Trash2 size={16}/></button></td></tr>))}</tbody></table></div>
      </div>
    );
}

function PropostasView({ propostas, clientes, refresh, session, onPrint }: any) {
    const [editing, setEditing] = useState<any>(null);
    const [filtroAno, setFiltroAno] = useState<string>(new Date().getFullYear().toString());
    const [filtroMes, setFiltroMes] = useState<string>("todos");
    const filtradas = useMemo(() => propostas.filter((p: any) => { const [ano, mes] = p.data.split('-'); return (filtroAno === "todos" || ano === filtroAno) && (filtroMes === "todos" || mes === filtroMes); }), [propostas, filtroAno, filtroMes]);
    async function handleSave() { if (!editing.cliente || !editing.projeto) return alert("Faltam dados"); 
        const { id, ...dataToSave } = editing;
        const res = editing.id === 'new' ? await supabase.from('propostas').insert([{ ...dataToSave, user_id: session.user.id }]) : await supabase.from('propostas').update(dataToSave).eq('id', editing.id);
        if (res.error) alert(res.error.message); else { setEditing(null); refresh(); } 
    }
    if (editing) {
      const cliSel = clientes.find((c: any) => c.nome_fantasia === editing.cliente);
      return (
        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-8 h-full animate-in slide-in-from-right duration-500 text-white font-white font-white font-white font-white font-white"><div className="space-y-6 overflow-y-auto pr-4 pb-20 custom-scrollbar text-white font-white font-white font-white"><button onClick={() => setEditing(null)} className="text-neutral-500 flex items-center gap-2 transition-all hover:text-white font-white font-white"><ChevronLeft size={16}/> Voltar</button>
            <div className="bg-[#0f0f0f] p-6 rounded-3xl border border-white/5 space-y-4 shadow-xl text-white font-white font-white"><label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest text-white font-white font-white">Vincular Cliente</label><select value={editing.cliente} onChange={e => setEditing({...editing, cliente: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-purple-500"><option value="">Selecione um Cliente (CRM)</option>{clientes.map((c: any) => (<option key={c.id} value={c.nome_fantasia}>{c.nome_fantasia}</option>))}</select><input value={editing.projeto} onChange={e => setEditing({...editing, projeto: e.target.value})} placeholder="Título do Projeto" className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-purple-500" /><div className="grid grid-cols-2 gap-2 text-white font-white"><input type="date" value={editing.data} onChange={e => setEditing({...editing, data: e.target.value})} className="bg-black border border-white/10 rounded-xl p-4 text-sm text-white" /><select value={editing.status} onChange={e => setEditing({...editing, status: e.target.value})} className="bg-black border border-white/10 rounded-xl p-4 text-sm text-white"><option value="rascunho">Rascunho</option><option value="aprovada">Aprovada</option></select></div></div>
            <textarea rows={4} value={editing.introducao || ""} onChange={e => setEditing({...editing, introducao: e.target.value})} className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl p-4 text-sm text-white resize-none outline-none focus:border-purple-500" placeholder="Intro estratégica..." />
            <textarea rows={6} value={editing.entregaveis || ""} onChange={e => setEditing({...editing, entregaveis: e.target.value})} className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl p-4 text-sm text-white outline-none font-mono focus:border-purple-500" placeholder="Deliverables..." />
            <div className="bg-[#0f0f0f] p-6 rounded-3xl border border-white/5 space-y-4 shadow-xl text-white font-white font-white font-white"><div className="flex justify-between items-center text-white