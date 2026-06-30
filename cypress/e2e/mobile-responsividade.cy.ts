describe('Mobile - Responsividade e Navegação (RNF-05)', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport('iphone-x');
    cy.visit('/project-umbu/');
    // aguarda o banner aparecer e tentar fechá-lo (se estiver presente)
    cy.get('body').then(($b) => {
      if ($b.find('#rgpd-banner[data-visible="true"]').length) {
        cy.get('#rgpd-banner').within(() => {
          cy.contains('button', /Aceitar Todos|Aceitar/i).click();
        });
        // espera evento custom de aceitação (definido no componente)
        cy.window().then((w) => {
          return new Cypress.Promise((resolve) => {
            const handler = () => { w.removeEventListener('LGPD_ACCEPTED', handler); resolve(null); };
            w.addEventListener('LGPD_ACCEPTED', handler);
            // caso o evento já tenha sido disparado no passado
            const pref = localStorage.getItem('lgpd_preferences');
            if (pref) { w.removeEventListener('LGPD_ACCEPTED', handler); resolve(null); }
          });
        });
      }
    });
  });

  it('deve garantir que os elementos são clicáveis no layout empilhado (mobile) sem falhas de sobreposição', () => {
    // Interagir com o painel de ajuda para garantir que os campos fiquem clicáveis após expansão/recolhimento
    cy.contains('Dicas de Acesso').click();
    cy.contains('joao@example.com').should('be.visible');
    cy.contains('Dicas de Acesso').click(); // recolher
    cy.contains('joao@example.com').should('not.exist');

    // Fazer o login preenchendo email e senha e clicando em "Entrar"
    cy.get('input[type="email"]').should('be.visible').clear().type('joao@example.com');
    cy.get('input[type="password"]').should('be.visible').clear().type('password123', { force: true });
    cy.contains('button', /Entrar|entrar/i).click();

    // Navegar até as franquias (valida o redirecionamento pós login)
    cy.location('pathname', { timeout: 8000 }).should('include', '/franquias');

    // Selecionar uma franquia
    cy.contains('button', /Selecionar|ver cardápio/i).first().click();
    cy.location('pathname').should('include', '/cardapio');

    // Ir ao cardápio e adicionar um item
    cy.contains('button', /Adicionar|comprar/i).first().click();

    // Ir para o carrinho
    cy.visit('/project-umbu/carrinho');

    // Validar se chegou no carrinho e se os elementos principais estão visíveis
    cy.contains(/Seu Carrinho|Carrinho/i, { timeout: 8000 }).should('be.visible');
  });
});
