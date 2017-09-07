import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  session: service(),
  authenticateUser: service(),

  actions: {
    authenticate(data) {
      return this.get('authenticateUser').login(data);
    },

    invalidateSession() {
      return this.get('session').invalidate();
    }
  }
});
