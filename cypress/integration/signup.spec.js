import { getUserData } from '../utils/getUserData';

it('successfully signs up using confirmation code sent via email', () => {
  const mailsaurServerId = Cypress.env('MAILOSAUR_SERVER_ID');
  const { email, password } = getUserData({ mailsaurServerId });

  cy.intercept('GET', '**/notes').as('getNotes');
  cy.fillSignupFormAndSubmit({ email, password });

  const options = {
    sentTo: email,
  };

  function resolvePromise(message) {
    const confirmationCode = message.html.body.match(/\d{6}/)[0];
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`);

    cy.wait('@getNotes');
    cy.contains('h1', 'Your Notes').should('be.visible');
  }

  cy.mailosaurGetMessage(mailsaurServerId, options).then(resolvePromise);
});
