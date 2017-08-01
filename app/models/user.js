import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr(),
  lastName: DS.attr(),
  login: DS.attr(),
  email: DS.attr(),
  password: DS.attr()
});
