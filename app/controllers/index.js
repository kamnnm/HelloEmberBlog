import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Controller.extend({
  sortProperties: ['createdAt:desc'],
  queryParams: ["page", "perPage"],

  sortedModel: Ember.computed.sort('model', 'sortProperties'),
  pagedModel: pagedArray('sortedModel', {perPage: 3}),

  page: Ember.computed.alias("pagedModel.page"),
  perPage: Ember.computed.alias("pagedModel.perPage"),
  totalPages: Ember.computed.oneWay("pagedModel.totalPages")
});
