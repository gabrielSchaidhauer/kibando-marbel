describe('Heroes', () => {
  // We need help on this one
  it('Should add new hero', () => {
    cy.visit('http://localhost:4200/heroes');
    cy.wait(4000);
    cy.get('input').type('Hero xyz');
    cy.get('button').eq(0).click();
    cy.visit('http://localhost:4200/heroes');
    cy.wait(4000)
    cy.get('a').contains('Hero xyz').as('inserted');
  });

  // This one works, but may be flaky
  it('Should delete Heroes', () => {
    // Get the requests to wait
    cy.server();
    cy.route('GET', 'http://localhost:4200/api/heroes').as('heroes');
    cy.route('DELETE', 'http://localhost:4200/api/heroes/*').as('deleteHeroes');

    // Enter the page
    cy.visit('http://localhost:4200/heroes');
    cy.wait('@heroes');

    // Get heroes list and change scope
    cy.get('.heroes').within(($ul) => {
      cy.get('li').then($li => {

        // Gather initial data to compare
        const itemsLength = $li.length;

        // Delete the first hero on the list
        cy.get('button').eq(0).click();
        cy.wait('@deleteHeroes');

        cy.visit('http://localhost:4200/heroes');
        cy.wait('@heroes');

        // After reloading check if it really was deleted.
        cy.get('li').its('length').should('be.lt', itemsLength);
      });
    });
  });
});
