export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  disponivel: boolean;
  sazonalJunino?: boolean;
}
