import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import UserValidations from '../validations/user';

export default Ember.Component.extend({
  classNames: ['user-register-component'],

  session: Ember.inject.service(),
  store: Ember.inject.service(),
  router: Ember.inject.service(),

  init() {
    this._super(...arguments);

    const model = this.get('store').createRecord('user');
    this.set('user', new Changeset(model, lookupValidator(UserValidations), UserValidations));
  },

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
          user.save().then(() => {
            const data = user.getProperties('login', 'password');
            this.get('session').authenticate('authenticator:jwt', data).catch(() => {
              this.get('router').transitionTo('index');
              //todo: оставлять на странице, скрывать форму и показывать ошибку.
            });
          }).catch((reason) => {
            this.set('errorMessage', reason.error || reason);
          });
        }
      });
    },
  },
});
