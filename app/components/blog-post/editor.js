import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import PostValidations from '../../validations/post';

export default Ember.Component.extend({
  classNames: ['blog-post-editor-component'],

  session: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  editing: false,

  init() {
    this._super(...arguments);
    this.setInitialState();
  },

  setInitialState() {
    debugger;
    this.set('post', new Changeset(this.get('model'), lookupValidator(PostValidations), PostValidations));
    // this.set('post', this.get('model'));
  },

  actions: {
    createPost() {
      this.set('errorMessage');
      let post = this.get('post');

      post.validate().then(() => {
        if(post.get("isValid")) {
          let promise = this.get('onSave')(post);

          promise.then(() => {
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
