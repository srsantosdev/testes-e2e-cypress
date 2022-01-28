import { login } from './functions/login';
import { fillSignupFormAndSubmit } from './functions/fillSignupFormAndSubmit';

Cypress.Commands.add('fillSignupFormAndSubmit', fillSignupFormAndSubmit);
Cypress.Commands.add('login', login);
