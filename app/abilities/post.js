import { Ability } from 'ember-can';
import Ember from 'ember';

export default Ability.extend({
  currentUser: Ember.inject.service(),

  canEdit: Ember.computed('currentUser.user', 'model.author', function() {
    return this.get('currentUser.user.id') === this.get('model.author.id');
  })
});
