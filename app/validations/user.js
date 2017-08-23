import {
  validatePresence,
  validateLength,
  validateConfirmation,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  firstName: [
    validatePresence(true),
    validateLength({ min: 3 })
  ],
  lastName: validatePresence(true),
  email: [
    validateFormat({ type: 'email' }),
  ],
  login: [
    validatePresence(true),
    validateLength({ min: 3 })
  ],
  password: [
    validatePresence(true),
    validateLength({ min: 6 }),
  ],
  passwordConfirmation: validateConfirmation({ on: 'password' })
};
