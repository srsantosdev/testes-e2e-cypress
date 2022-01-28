const { v4: uuid } = require('uuid');

it('successfully signs up using confirmation code sent via email', () => {
  const username = uuid();
  const mailsaurServerId = Cypress.env('MAILOSAUR_SERVER_ID');

  const emailAddress = `${username}@${mailsaurServerId}.mailosaur.net`;
  const password = Cypress.env('USER_PASSWORD');

  cy.intercept('GET', '**/notes').as('getNotes');

  cy.visit('/signup');

  cy.get('#email').type(emailAddress);
  cy.get('#password').type(password, { log: false });
  cy.get('#confirmPassword').type(password, { log: false });

  cy.contains('button', 'Signup').click();

  cy.get('#confirmationCode').should('be.visible');

  const options = {
    sentTo: emailAddress,
  };

  function resolvePromise(message) {
    const confirmationCode = message.html.body.match(/\d{6}/)[0];
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`);

    cy.wait('@getNotes');
    cy.contains('h1', 'Your Notes').should('be.visible');
  }

  cy.mailosaurGetMessage(mailsaurServerId, options).then(resolvePromise);
});
