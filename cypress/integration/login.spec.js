it('successfully logs in', () => {
  cy.intercept('GET', '**/notes').as('getNotes');

  const email = Cypress.env('USER_EMAIL');
  const password = Cypress.env('USER_PASSWORD');

  cy.fillLoginFormAndSubmit(
    { email, password },
    { cacheSession: false },
  );

  cy.wait('@getNotes');
  cy.contains('h1', 'Your Notes').should('be.visible');
});
