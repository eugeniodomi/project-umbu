type LogEvent = 'ORDER_CREATED' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILURE' | 'LGPD_CONSENT_GIVEN' | 'LGPD_PREFERENCES_SAVED';

export function logEvent(eventName: LogEvent, payload?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] EVENT: ${eventName}`, payload ? payload : '');
}
