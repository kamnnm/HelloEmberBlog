import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('blog-post-editor', 'Integration | Component | blog post editor', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{blog-post-editor}}`);
  assert.equal(this.$('.blog-post-editor-component').length, 1);
});
