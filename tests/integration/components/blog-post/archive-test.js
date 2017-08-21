import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('blog-post/archive', 'Integration | Component | blog post/archive', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{blog-post/archive}}`);
  assert.equal(this.$('.blog-post-archive-component').length, 1);
});
