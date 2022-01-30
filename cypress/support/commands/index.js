import { login } from './functions/login';
import { fillSignupFormAndSubmit } from './functions/fillSignupFormAndSubmit';
import { createNote } from './functions/createNote';
import { editNote } from './functions/editNote';
import { deleteNote } from './functions/deleteNote';
import { fillSettingsFormAndSubmit } from './functions/fillSettingsFormAndSubmit';

Cypress.Commands.add('fillSignupFormAndSubmit', fillSignupFormAndSubmit);
Cypress.Commands.add('login', login);
Cypress.Commands.add('createNote', createNote);
Cypress.Commands.add('editNote', editNote);
Cypress.Commands.add('deleteNote', deleteNote);
Cypress.Commands.add('fillSettingsFormAndSubmit', fillSettingsFormAndSubmit);
