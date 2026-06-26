export interface Franquia {
  id: string;
  nome: string;
  status: 'ativa' | 'reduzida';
  canais: Array<'APP' | 'TOTEM' | 'PICKUP'>;
}
