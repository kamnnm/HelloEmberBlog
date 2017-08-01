import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  createdAt: DS.attr(),
  user: DS.belongsTo('user')
});
