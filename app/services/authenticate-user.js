import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Service.extend({
  session: service(),

  login(data) {
    return this.get('session').authenticate('authenticator:jwt', data);
  }
});
