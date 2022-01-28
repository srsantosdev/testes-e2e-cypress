export function login({ email, password }, { cacheSession = true } = {}) {
  function fillForm() {
    cy.visit('/login');
    cy.get('#email').type(email);
    cy.get('#password').type(password, { log: false });
    cy.contains('button', 'Login').click();
  }

  if (cacheSession) {
    cy.session([email, password], fillForm);

    return;
  }

  fillForm();
}
