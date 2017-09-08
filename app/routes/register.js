import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  session: service(),
  flashMessages: service(),
  authenticateUser: service(),

  model() {
    return this.get('store').createRecord('user')
  },

  actions: {
    saveUser(user) {
      return user.save().then(() => {
        const data = user.getProperties('login', 'apassword');

        let authPromise = this.get('authenticateUser').login(data);
        authPromise.catch((reason) => {
          this.get('flashMessages').danger(reason.message);
          this.transitionTo('index');
          //todo: оставлять на странице, скрывать форму и показывать ошибку.
        });
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
