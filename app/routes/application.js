import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  moment: Ember.inject.service(),
  beforeModel() {
    this.get('moment').setLocale('ru');
  }
});
