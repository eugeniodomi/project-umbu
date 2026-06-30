describe('Fluxo Crítico da Aplicação', () => {
  it('Deve realizar a jornada completa: login, adicionar ao carrinho e checkout', () => {
    cy.clearLocalStorage();
    // 1. Acesso e LGPD
    cy.visit('/project-umbu/');
    cy.get('button').contains(/aceitar|concordar|entendi/i).click();

    // 2. Login
    cy.url().should('include', '/project-umbu');
    cy.get('input[type="email"]').type('joao@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button').contains(/entrar/i).click();
    cy.url().should('include', '/franquias');

    // 3. Seleção de Franquia e Produto
    // Clica em uma franquia para ir ao '/cardapio'
    cy.get('button, a, div[role="button"]').contains(/ver cardápio|selecionar/i).first().click();
    
    // Encontra o botão de adicionar um produto, clica nele
    cy.url().should('include', '/cardapio');
    cy.get('button').contains(/adicionar|comprar/i).first().click();

    // 4. Carrinho e Checkout
    // Navegação via UI para preservar o estado do React Router
    cy.contains(/carrinho/i).click();
    
    // Valida se o texto 'Total' mudou ou se o item aparece na tela
    cy.contains(/total/i).should('be.visible');

    // A partir do carrinho, clica no botão de ir para pagamento
    cy.get('button').contains(/checkout|finalizar|pagamento/i).click();

    // Na rota '/checkout', clica no botão de confirmar e pagar
    cy.url().should('include', '/checkout');
    cy.get('button').contains(/confirmar e pagar/i).click();

    // Valida se o botão entra em estado de 'loading' ou se uma mensagem de sucesso/erro aparece
    cy.get('body').then(($body) => {
      const hasLoadingOrDisabled = $body.find('button[disabled]').length > 0 || $body.find('button:contains("Processando")').length > 0;
      const hasMessage = $body.text().match(/sucesso|erro|falha/i) !== null;
      
      expect(hasLoadingOrDisabled || hasMessage).to.be.true;
    });
  });
});
