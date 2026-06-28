export function calcularPontos(valorTotal: number): number {
  if (valorTotal < 0) return 0;
  return Math.floor(valorTotal / 10);
}
