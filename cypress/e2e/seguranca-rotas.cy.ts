describe('Segurança - Route Guards (RNF-Segurança)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });
  
  it('Cenário A (Tentativa de acesso sem login): Deve redirecionar de /franquias para /', () => {
    cy.visit('/project-umbu/franquias');
    
    // Afirma que a URL foi redirecionada de volta para / (Login)
    cy.location('pathname').should('eq', '/project-umbu/');
    cy.contains('Login').should('be.visible');
  });

  it('Cenário B (Acesso à raiz sem login): Deve mostrar a tela de login', () => {
    cy.visit('/project-umbu/');
    
    // Afirma que está na raiz e mostra login
    cy.location('pathname').should('eq', '/project-umbu/');
    cy.contains('Login').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
  });

  it('Cenário C (Login válido): Deve levar o usuário para /franquias', () => {
    cy.visit('/project-umbu/');
    cy.get('input[type="email"]').type('joao@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('button', 'Entrar').click();

    // Confirma que está logado e foi para franquias
    cy.location('pathname').should('include', '/franquias');
  });
  
});
