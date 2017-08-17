import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['blog-post-component'],

  currentUser: Ember.inject.service(),

  editing: false,

  canEdit: Ember.computed('post.createdBy', function() {
    return this.get('currentUser.user.id') == this.get(`post.user.id`);
  }),

  actions: {
    edit() {
      this.set('editing', true);
    },
    cancel() {
      this.set('editing', false);
    }
  }
});
