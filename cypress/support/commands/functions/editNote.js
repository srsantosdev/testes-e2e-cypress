import { attachFileHandler } from '../handlers/attachFileHandler';

export function editNote(note, newValue, attachFile = false) {
  cy.intercept('GET', '**/notes/**').as('getNote');

  cy.contains('.list-group-item', note).click();
  cy.wait('@getNote');

  cy.get('#content')
    .clear()
    .type(newValue);

  if (attachFile) {
    attachFileHandler();
  }

  cy.contains('button', 'Save').click();

  cy.contains('.list-group-item', note).should('not.exist');
  cy.contains('.list-group-item', newValue).should('be.visible');
}
