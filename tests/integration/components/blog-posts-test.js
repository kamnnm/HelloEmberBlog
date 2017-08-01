import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { startMirage } from 'hello-ember-blog/initializers/ember-cli-mirage';

moduleForComponent('blog-posts', 'Integration | Component | blog posts', {
  integration: true,
  beforeEach() {
    this.server = startMirage();
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('it renders', function(assert) {
  assert.expect(3);

  const title = 'Blog Post Title';
  const description = 'Now is the time for all good robots...';

  const model = server.createList('post', 1, { title: title, description: description });

  this.set('model', model);
  this.render(hbs`{{blog-posts posts=model}}`);

  assert.equal(this.$('.blog-posts-component').length, 1);
  assert.equal(this.$('.blog-post-title').text().trim(), title);
  assert.equal(this.$('.blog-post-description').text().trim(), description);
});
