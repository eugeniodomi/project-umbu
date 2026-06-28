export function validarPedido(itens: any[], franquiaStatus: string): { valido: boolean; erro?: string } {
  if (!itens || itens.length === 0) {
    return { valido: false, erro: 'O pedido não pode ter array de itens vazio.' };
  }

  if (franquiaStatus !== 'ativa' && franquiaStatus !== 'reduzida') {
    return { valido: false, erro: "O status da franquia deve ser 'ativa' ou 'reduzida'." };
  }

  return { valido: true };
}
