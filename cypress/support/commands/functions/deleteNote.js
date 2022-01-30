export function deleteNote(note) {
  cy.contains('.list-group-item', note).click();
  cy.contains('button', 'Delete').click();

  cy.contains('.list-group-item', note).should('not.exist');
}
