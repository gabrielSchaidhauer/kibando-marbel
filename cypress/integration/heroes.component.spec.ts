describe('Heroes', () => {
  it('Should add new hero', () => {
    cy.visit('http://localhost:4200/heroes');
    cy.wait(4000);
    cy.get('input').type('Hero xyz');
    cy.get('button').eq(0).click();
    cy.visit('http://localhost:4200/heroes');
    cy.wait(4000)
    cy.get('a').contains('Hero xyz').as('inserted');
  });

  it.only('Should delete Heroes', () => {
    cy.visit('http://localhost:4200/heroes');
    cy.wait(4000);
    cy.get('button').its('length').as('length')
    //cy.get('button').eq(2).click();
    cy.visit('http://localhost:4200/heroes');
    cy.wait(4000)
    cy.get('button').its('length').should('be.lte', '@length');
  });
});
