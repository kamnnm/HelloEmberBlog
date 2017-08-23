import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  fullName: null,

  actions: {
    fullNameChanged(fullName) {
      this.set('fullName', fullName);
    }
  }
});
