import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nl2br', 'helper:nl2br', {
  integration: true
});

test('it renders', function(assert) {
  const input  = `foo
                  bar`;
  const expect = `foo<br>
                  bar`;

  this.set('inputValue', input);
  this.render(hbs`{{nl2br inputValue}}`);
  assert.equal(this.$().html().trim(), expect);
});
