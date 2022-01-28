const faker = require('faker');

it('CRUDs a note', () => {
  const email = Cypress.env('USER_EMAIL');
  const password = Cypress.env('USER_PASSWORD');

  const noteDescription = faker.lorem.words(4);

  cy.intercept('GET', '**/notes').as('getNotes');
  cy.intercept('GET', '**/notes/**').as('getNote');

  cy.login(
    { email, password },
    { cacheSession: false },
  );

  cy.wait('@getNotes');

  cy.visit('/notes/new');
  cy.get('#content').type(noteDescription);
  cy.contains('button', 'Create').click();

  cy.wait('@getNotes');
  cy.contains('.list-group-item', noteDescription)
    .should('be.visible')
    .click();
  cy.wait('@getNote');

  const updatedNoteDescription = faker.lorem.words(4);

  cy.get('#content')
    .clear()
    .type(updatedNoteDescription);
  cy.contains('button', 'Save').click();
  cy.wait('@getNotes');

  cy.contains('.list-group-item', noteDescription).should('not.exist');
  cy.contains('.list-group-item', updatedNoteDescription)
    .should('be.visible')
    .click();
  cy.wait('@getNote');
  cy.contains('button', 'Delete').click();
  cy.wait('@getNotes');

  cy.contains('.list-group-item', updatedNoteDescription).should('not.exist');
});
