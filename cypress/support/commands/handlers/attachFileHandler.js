export const attachFileHandler = () => {
  cy.get('#file').attachFile('example.json');
};
