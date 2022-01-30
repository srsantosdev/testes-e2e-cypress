export function fillSettingsFormAndSubmit() {
  cy.visit('/settings');
  cy.get('#storage').type('1');
  cy.get('#name').type('Mary Doe');
  cy.iframe('.card-field iframe')
    .as('iframe')
    .find('[name="cardnumber"]')
    .type('4242424242424242');
  cy.get('@iframe')
    .find('[name="exp-date"]')
    .type('1271');
  cy.get('@iframe')
    .find('[name="cvc"]')
    .type('123');
  cy.get('@iframe')
    .find('[name="postal"]')
    .type('12345');
  cy.contains('button', 'Purchase').click();
}
