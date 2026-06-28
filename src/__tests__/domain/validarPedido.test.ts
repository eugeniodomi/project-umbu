import { describe, it, expect } from 'vitest';
import { validarPedido } from '../../domain/rules/validarPedido';

describe('Domain: validarPedido', () => {
  it('should approve an order with items and active franchise status', () => {
    // Arrange
    const itens = [{ id: 1, name: 'Item 1' }];
    const franquiaStatus = 'ativa';

    // Act
    const result = validarPedido(itens, franquiaStatus);

    // Assert
    expect(result.valido).toBe(true);
    expect(result.erro).toBeUndefined();
  });

  it('should reject an order with empty items', () => {
    // Arrange
    const itens: any[] = [];
    const franquiaStatus = 'ativa';

    // Act
    const result = validarPedido(itens, franquiaStatus);

    // Assert
    expect(result.valido).toBe(false);
    expect(result.erro).toBe('O pedido não pode ter array de itens vazio.');
  });

  it('should reject an order with inactive franchise status', () => {
    // Arrange
    const itens = [{ id: 1, name: 'Item 1' }];
    const franquiaStatus = 'inativa';

    // Act
    const result = validarPedido(itens, franquiaStatus);

    // Assert
    expect(result.valido).toBe(false);
    expect(result.erro).toBe("O status da franquia deve ser 'ativa' ou 'reduzida'.");
  });
});
