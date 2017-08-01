import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('public-posts', 'Integration | Component | public posts', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{user-login}}`);
  assert.equal(this.$('.user-login-component').length, 1);
});
