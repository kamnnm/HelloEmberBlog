import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  classNames: ['user-login-component'],

  session: service(),
  currentUser: service(),

  actions: {
    authenticate() {
      this.set('errorMessage');

      const data = this.getProperties('login', 'password');

      let authPromise = this.get('onAuthenticate')(data);
      authPromise.catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    },

    invalidateSession() {
      this.get('onInvalidate')();
    }
  }
});
