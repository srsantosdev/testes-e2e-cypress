import { attachFileHandler } from '../handlers/attachFileHandler';

export function createNote(note, attachFile = false) {
  cy.visit('/notes/new');
  cy.get('#content').type(note);

  if (attachFile) {
    attachFileHandler();
  }

  cy.contains('button', 'Create').click();

  cy.contains('.list-group-item', note).should('be.visible');
}
