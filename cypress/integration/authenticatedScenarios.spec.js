const faker = require('faker');

describe('Scenarios where authentication is a pre-requirement', () => {
  beforeEach(() => {
    const email = Cypress.env('USER_EMAIL');
    const password = Cypress.env('USER_PASSWORD');

    cy.intercept('GET', '**/notes').as('getNotes');
    cy.login({ email, password }, { cacheSession: false });
  });

  it('CRUDs a note', () => {
    const noteDescription = faker.lorem.words(4);

    cy.wait('@getNotes');

    cy.createNote(noteDescription);
    cy.wait('@getNotes');

    const updatedNoteDescription = faker.lorem.words(4);
    const ATTACH_FILE = true;

    cy.editNote(noteDescription, updatedNoteDescription, ATTACH_FILE);
    cy.wait('@getNotes');

    cy.deleteNote(updatedNoteDescription);
    cy.wait('@getNotes');
  });

  it('successfully submits the form', () => {
    cy.intercept('POST', '**/prod/billing').as('paymentRequest');

    cy.wait('@getNotes');

    cy.fillSettingsFormAndSubmit();

    cy.wait('@getNotes');
    cy.wait('@paymentRequest').then((response) => {
      expect(response.state).to.equal('Complete');
    });
  });
});
