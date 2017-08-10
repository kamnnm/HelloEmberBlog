import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  firstName: DS.attr(),
  lastName: DS.attr(),
  login: DS.attr(),
  email: DS.attr(),
  password: DS.attr(),
  posts: DS.hasMany('post'),
  fullName: Ember.computed("lastName", "firstName", function fullName(){
    const { firstName, lastName } = this.getProperties('firstName', 'lastName');

    if(firstName && lastName)
      return `${firstName} ${lastName}`;
  }),
});
