import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  author: DS.belongsTo('user'),
  month: Ember.computed("createdAt", function month() {
    return moment(this.get('createdAt')).format('MMYYYY');
  }),
  monthText: Ember.computed("createdAt", function month() {
    return moment(this.get('createdAt')).format('MMMM YYYY');
  }),
});
