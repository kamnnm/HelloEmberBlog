import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-register', 'Integration | Component | user register', {
  integration: true,
  beforeEach: function() {
    this.inject.service('store');
    this.user = this.store.createRecord('user');
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{user-register model=user}}`);
  assert.equal(this.$('.user-register-component').length, 1);
});
