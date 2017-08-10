import Base from 'ember-simple-auth/authorizers/base';
import Ember from 'ember';

export default Base.extend({
  session: Ember.inject.service(),
  authorize(data, block) {
    // If we are testing, just going to hardcode the token
    // if (Ember.testing) {
    //   block('Authorization', 'Bearer hotdog');
    // }
    const { token } = data;
    if (this.get('session.isAuthenticated') && token) {
      block('Authorization', `Bearer ${token}`);
    }
  }
});
