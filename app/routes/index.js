import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('post', {include: 'user'});
  }
});
//
// export default Ember.Route.extend({
//   model(params) {
//    return this.store.findRecord('post', params.post_id, {include: 'comments'});
//   }
// });
