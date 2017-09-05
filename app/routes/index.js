import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      posts: this.get('store').findAll('post', {include: 'author'}),
      newPost: this.get('store').createRecord('post')
    });
  },

  actions: {
    savePost(post) {
      let isNew = post.get('isNew');
      return post.save().then(() => {
        if(isNew) {
          this.controller.set('model.newPost', this.get('store').createRecord('post'));
        }
      });
    },

    willTransition() {
      let newPost = this.controller.get('model.newPost');

      if (newPost.get('isNew')) {
        newPost.destroyRecord();
      }
    }
  }
});
