const { v4: uuid } = require('uuid');

export function getUserData({ mailsaurServerId }) {
  const username = uuid();

  const email = `${username}@${mailsaurServerId}.mailosaur.net`;
  const password = Cypress.env('USER_PASSWORD');

  return {
    email,
    password,
  };
}
