describe('Mobile - Responsividade e Navegação (RNF-05)', () => {
  beforeEach(() => {
    // Simula a tela de um celular usando viewport do iPhone X
    cy.viewport('iphone-x');
    cy.visit('/');
  });

  it('deve garantir que os elementos são clicáveis no layout empilhado (mobile) sem falhas de sobreposição', () => {
    // Fazer o login preenchendo email e senha e clicando em "Entrar"
    cy.get('input[type="email"]').type('teste@teste.com');
    cy.get('input[type="password"]').type('123456');
    cy.contains('button', 'Entrar').click();

    // Navegar até as franquias (valida o redirecionamento pós login)
    cy.location('pathname').should('eq', '/franquias');

    // Selecionar uma franquia
    cy.contains('button', 'Selecionar').first().click();
    cy.location('pathname').should('eq', '/cardapio');

    // Ir ao cardápio e adicionar um item
    cy.contains('button', 'Adicionar').first().click();

    // Ir para o carrinho
    cy.visit('/carrinho');
    
    // Validar se chegou no carrinho e se os elementos principais estão visíveis
    cy.contains('Seu Carrinho').should('be.visible');
  });
});
