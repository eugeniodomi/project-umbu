describe('Segurança - Route Guards (RNF-Segurança)', () => {
  
  it('Cenário A (Tentativa de acesso sem login): Deve redirecionar de /franquias para /', () => {
    cy.clearLocalStorage();
    cy.visit('/franquias');
    
    // Afirma que a URL foi redirecionada de volta para / (Login)
    cy.location('pathname').should('eq', '/');
  });

  it('Cenário B (Tentativa de voltar ao login logado): Deve empurrar o usuário de volta para /franquias', () => {
    // Fazer o login normal (/)
    cy.visit('/');
    cy.get('input[type="email"]').type('teste@teste.com');
    cy.get('input[type="password"]').type('123456');
    cy.contains('button', 'Entrar').click();

    // Confirma que está logado
    cy.location('pathname').should('eq', '/franquias');

    // Após logar, tentar forçar a navegação para cy.visit('/')
    cy.visit('/');

    // Afirma que a URL empurra o usuário de volta para /franquias
    cy.location('pathname').should('eq', '/franquias');
  });
  
});
