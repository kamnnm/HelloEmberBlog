import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['blog-post-editor-component'],

  store: Ember.inject.service(),
  session: Ember.inject.service(),

  actions: {
    createPost() {
      let { title, description } = this.getProperties('title', 'description');

      const store = this.get('store');

      let post = store.createRecord('post', {
        title: title,
        description: description
      });

      post.save();
    }
  }
});
