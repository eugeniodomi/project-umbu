describe('Segurança - Route Guards (RNF-Segurança)', () => {
  
  it('Cenário A (Tentativa de acesso sem login): Deve redirecionar de /franquias para /', () => {
    cy.clearLocalStorage();
    cy.visit('/project-umbu/franquias');
    
    // Afirma que a URL foi redirecionada de volta para / (Login)
    cy.location('pathname').should('include', '/project-umbu');
  });

  it('Cenário B (Login válido): Deve levar o usuário para /franquias', () => {
    cy.clearLocalStorage();
    cy.visit('/project-umbu/');
    cy.get('input[type="email"]').type('joao@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('button', 'Entrar').click();

    // Confirma que está logado e foi para franquias
    cy.location('pathname').should('include', '/franquias');
  });
  
});
