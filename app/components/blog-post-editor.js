import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import PostValidations from '../validations/post';

export default Ember.Component.extend({
  classNames: ['blog-post-editor-component'],
  classNameBindings: ['editing:blog-post-edit-component:blog-post-create-component'],

  store: Ember.inject.service(),
  session: Ember.inject.service(),
  currentUser: Ember.inject.service('current-user'),

  editing: false,

  init() {
    this._super(...arguments);
    this.setInitialState();
  },

  setInitialState() {
    const model = this.get('object') || this.get('store').createRecord('post');
    this.set('post', new Changeset(model, lookupValidator(PostValidations), PostValidations));
  },

  actions: {
    createPost() {
      let post = this.get('post');

      post.validate().then(() => {
        if(post.get("isValid")) {
          post.save().then(() => {
            if(this.get('editing')) {
              this.get('onCancel')();
            }

            this.setInitialState();
          }).catch((reason) => {
            this.set('errorMessage', reason.error || reason);
          });
        }
      });
    },
    cancel() {
      this.get('onCancel')();
    }
  }
});
