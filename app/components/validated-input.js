import Ember from 'ember';

export default Ember.Component.extend({
  model: null,
  property: null,

  hasError: Ember.computed('model.error', function() {
    const property = this.get('property');
    return this.get(`model.error.${property}`);
  })
});
// -------------------------------------------------------
// const ValidatedInput = Ember.Component.extend({
//   hasError: Ember.computed('model.error', function() {
//     const property = this.get('property');
//     return this.get(`model.error.${property}`);
//   })
// });
//
// ValidatedInput.reopenClass({
//   positionalParams: ['model', 'property']
// });
//
// export default ValidatedInput;
