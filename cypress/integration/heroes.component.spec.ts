describe('Heroes', () => {
  it('Should add new hero', () => {
    cy.visit('http://localhost:4200/heroes');
    cy.get('input').type('Hero xyz');
    cy.get('button').get(0).click();
  });
});
