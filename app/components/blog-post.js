import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['blog-post-component'],

  currentUser: Ember.inject.service(),

  editing: false,

  actions: {
    edit() {
      this.set('editing', true);
    },
    cancel() {
      this.set('editing', false);
    }
  }
});
