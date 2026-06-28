import { describe, it, expect } from 'vitest';
import { calcularPontos } from '../../application/services/fidelizacaoService';

describe('Application: fidelizacaoService', () => {
  it('should calculate points correctly for a purchase of 50.00 (CT-007)', () => {
    // Arrange
    const valorGasto = 50.00;

    // Act
    const pontos = calcularPontos(valorGasto);

    // Assert
    expect(pontos).toBe(5);
  });

  it('should calculate points correctly for a purchase of 59.90 (CT-007)', () => {
    // Arrange
    const valorGasto = 59.90;

    // Act
    const pontos = calcularPontos(valorGasto);

    // Assert
    expect(pontos).toBe(5);
  });

  it('should return 0 points for negative values', () => {
    // Arrange
    const valorGasto = -10.00;

    // Act
    const pontos = calcularPontos(valorGasto);

    // Assert
    expect(pontos).toBe(0);
  });
});
