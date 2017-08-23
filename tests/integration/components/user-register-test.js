import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-register', 'Integration | Component | user register', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{user-register}}`);
  assert.equal(this.$('.user-register-component').length, 1);
});
