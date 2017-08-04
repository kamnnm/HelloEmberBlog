import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['createdAt:desc'],
  sortedModel: Ember.computed.sort('model', 'sortProperties')
});
