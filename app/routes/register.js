import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model() {
    return this.get('store').createRecord('user')
  },

  actions: {
    saveUser(user) {
      user.save().then(() => {
        const data = user.getProperties('login', 'password');
        this.get('session').authenticate('authenticator:jwt', data).catch(() => {
          this.transitionTo('index');
          //todo: оставлять на странице, скрывать форму и показывать ошибку.
        });
      }).catch((reason) => {
        this.set('error', reason.error || reason);
      });
    },

    willTransition() {
      let newUser = this.controller.get('model');

      if (newUser.get('isNew')) {
        newUser.destroyRecord();
      }
    }
  }
});
