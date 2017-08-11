import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import PostValidations from '../validations/post';

export default Ember.Component.extend({
  classNames: ['blog-post-editor-component'],

  store: Ember.inject.service(),
  session: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.setInitialState();
  },

  setInitialState() {
    let model = this.get('store').createRecord('post');
    this.set('post', new Changeset(model, lookupValidator(PostValidations), PostValidations));
  },

  titleError: Ember.computed.bool('post.error.title'),

  actions: {
    createPost() {
      let post = this.get('post');

      post.validate().then(() => {
        if(post.get("isValid")) {
          post.save().then(() => {
            this.setInitialState();
          }).catch((reason) => {
            this.set('errorMessage', reason.error || reason);
          });
        }
      });
    }
  }
});
