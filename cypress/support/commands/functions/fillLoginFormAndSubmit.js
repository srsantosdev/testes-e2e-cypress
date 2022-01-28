function login({ email, password }) {
  cy.visit('/login');
  cy.get('#email').type(email);
  cy.get('#password').type(password, { log: false });
  cy.contains('button', 'Login').click();
}
export function fillLoginFormAndSubmit({ email, password }, { cacheSession = true } = {}) {
  if (cacheSession) {
    cy.session([{ email, password }], login);
    return;
  }

  login({ email, password });
}
