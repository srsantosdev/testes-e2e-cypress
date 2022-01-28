import { fillLoginFormAndSubmit } from './functions/fillLoginFormAndSubmit';
import { fillSignupFormAndSubmit } from './functions/fillSignupFormAndSubmit';

Cypress.Commands.add('fillSignupFormAndSubmit', fillSignupFormAndSubmit);
Cypress.Commands.add('fillLoginFormAndSubmit', fillLoginFormAndSubmit);
