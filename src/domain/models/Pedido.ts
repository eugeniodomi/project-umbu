import { type Produto } from './Produto';

export interface Pedido {
  id: string;
  usuarioId: string;
  franquiaId: string;
  itens: Array<{
    produto: Produto;
    quantidade: number;
  }>;
  valorTotal: number;
  status: 'PENDENTE' | 'APROVADO' | 'RECUSADO';
  dataCriacao: string;
}
