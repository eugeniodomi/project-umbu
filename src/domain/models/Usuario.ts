export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  saldoPontosFidelidade: number;
}
