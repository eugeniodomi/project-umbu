describe('LGPD - Banner de Consentimento (RNF-LGPD)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('deve exibir o banner de LGPD, permitir aceitar e persistir a escolha no localStorage', () => {
    // Verifica se o texto do banner está visível
    cy.contains('Como cuidamos dos seus dados').should('be.visible');

    // Clica no botão "Aceitar Todos"
    cy.contains('button', 'Aceitar Todos').click();

    // Verifica se a chave foi gravada no localStorage
    cy.window().its('localStorage').invoke('getItem', 'lgpd_preferences').should('exist');

    // Recarrega a página e valida que o banner NÃO está mais visível
    cy.reload();
    cy.contains('Como cuidamos dos seus dados').should('not.exist');
  });
});
