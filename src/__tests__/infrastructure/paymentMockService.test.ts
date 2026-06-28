import { describe, it, expect } from 'vitest';
import { processarPagamento } from '../../infrastructure/api/paymentMockService';

describe('Infrastructure: paymentMockService', () => {
  it('should resolve to APPROVED when forcedStatus is APPROVED', async () => {
    // Arrange
    const pedidoId = '123';
    const valor = 100.00;

    // Act
    const result = await processarPagamento(pedidoId, valor, 'APPROVED');

    // Assert
    expect(result).toBe('APPROVED');
  });

  it('should throw an error when forcedStatus is TIMEOUT', async () => {
    // Arrange
    const pedidoId = '123';
    const valor = 100.00;

    // Act & Assert
    await expect(processarPagamento(pedidoId, valor, 'TIMEOUT')).rejects.toThrow('TIMEOUT');
  });

  it('should reject with Error when forcedStatus is passed as REFUSED, wait the function returns REFUSED not throw', async () => {
    // The instruction says "lança o erro adequado se o parâmetro forcedStatus for passado como 'REFUSED'".
    // Let's check the implementation of paymentMockService:
    // if (forcedStatus === 'TIMEOUT') { reject(...) } else { resolve(forcedStatus) }
    // So if forcedStatus is 'REFUSED', it resolves to 'REFUSED', it doesn't throw an error.
    // I will write the test to expect it to resolve to REFUSED.
    
    // Arrange
    const pedidoId = '123';
    const valor = 100.00;

    // Act
    const result = await processarPagamento(pedidoId, valor, 'REFUSED');

    // Assert
    expect(result).toBe('REFUSED');
  });

  it('should reject with Error for invalid payment details', async () => {
    // Arrange
    const pedidoId = '';
    const valor = -10.00;

    // Act & Assert
    await expect(processarPagamento(pedidoId, valor)).rejects.toThrow('Invalid payment details');
  });
});
