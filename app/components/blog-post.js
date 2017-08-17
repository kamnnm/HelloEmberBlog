import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['blog-post-component'],

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
