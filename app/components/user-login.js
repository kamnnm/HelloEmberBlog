import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-login-component'],

  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  actions: {
    authenticate() {
      this.set('errorMessage');
      let data = this.getProperties('login', 'password');
      this.get('session').authenticate('authenticator:jwt', data).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    },

    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
