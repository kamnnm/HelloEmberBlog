import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-login-component'],

  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    },

    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
