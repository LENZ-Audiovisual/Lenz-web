export interface OrcamentoItem {
  id: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
}

export interface SavedProposal {
  id: string;
  cliente: string;
  projeto: string;
  data: string;
  total: number;
  itens: OrcamentoItem[];
  introducao: string;
  validade: string;
  modoDetalhado: boolean;
}

export interface FinanceItem {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'entrada' | 'saida';
  data: string;
  categoria: string;
}