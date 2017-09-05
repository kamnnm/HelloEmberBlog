import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Controller.extend({
  sortProperties: ['createdAt:desc'],
  queryParams: ["page", "perPage", "month"],

  month: null,

  filteredModel: Ember.computed.filterBy('model.posts', 'isNew', false),
  sortedModel: Ember.computed.sort('filteredModel', 'sortProperties'),

  archiveModel: Ember.computed.uniqBy('sortedModel', 'month'),

  filteredByMonthModel: Ember.computed('sortedModel', 'month',  function() {
    const month = this.get('month');
    const sortedModel = this.get('sortedModel');

    if (month) {
      return sortedModel.filterBy('month', month);
    }
    else {
      return sortedModel;
    }
  }),
  pagedModel: pagedArray('filteredByMonthModel', {perPage: 3}),

  page: Ember.computed.alias("pagedModel.page"),
  perPage: Ember.computed.alias("pagedModel.perPage"),
  totalPages: Ember.computed.oneWay("pagedModel.totalPages")
});
