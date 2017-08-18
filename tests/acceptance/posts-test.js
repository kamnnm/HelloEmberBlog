import { test } from 'qunit';
import moduleForAcceptance from 'hello-ember-blog/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | posts');

test('visiting /', function(assert) {
  visit('/');

  server.createList('post', 3);

  andThen(function() {
    assert.equal(
      find('.blog-post-article').length,
      3,
      'We can see 3 posts on /'
    );
  });
});
