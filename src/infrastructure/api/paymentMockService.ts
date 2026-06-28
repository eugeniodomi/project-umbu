export type PaymentStatus = 'APPROVED' | 'REFUSED' | 'TIMEOUT';

export async function processarPagamento(
  pedidoId: string, 
  valor: number, 
  forcedStatus?: PaymentStatus
): Promise<PaymentStatus> {
  const delay = Math.floor(Math.random() * (2000 - 800 + 1)) + 800;

  return new Promise((resolve, reject) => {
    // Validate arguments to ensure they are not unused
    if (!pedidoId || valor < 0) {
      reject(new Error('Invalid payment details'));
      return;
    }

    setTimeout(() => {
      if (forcedStatus) {
        if (forcedStatus === 'TIMEOUT') {
          reject(new Error('TIMEOUT'));
        } else {
          resolve(forcedStatus);
        }
        return;
      }

      const isRefused = Math.random() < 0.2; // 20% chance of being refused
      if (isRefused) {
        resolve('REFUSED');
      } else {
        resolve('APPROVED');
      }
    }, delay);
  });
}
