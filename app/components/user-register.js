import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import UserValidations from '../validations/user';

export default Ember.Component.extend({
  classNames: ['user-register-component'],

  user: Ember.computed('model', function() {
    return new Changeset(this.get('model'), lookupValidator(UserValidations), UserValidations);
  }),

  fullNameChanged: Ember.observer('user.firstName', 'user.lastName', function functionName() {
    const onFullNameChanged = this.get('onFullNameChanged');
    if(onFullNameChanged) {
      const firstName = this.get('user.firstName') || '';
      const lastName = this.get('user.lastName') || '';

      let fullName = null;

      if(firstName || lastName) {
        fullName = `${firstName} ${lastName}`;
      }

      onFullNameChanged(fullName);
    }
  }),

  actions: {
    register() {
      this.set('errorMessage');
      let user = this.get('user');

      user.validate().then(() => {
        if(user.get("isValid")) {
          let promise = this.get('onSave')(user);

          promise.catch((reason) => {
            this.set('errorMessage', reason.error || reason);
          });
        }
      });
    },
  },
});
