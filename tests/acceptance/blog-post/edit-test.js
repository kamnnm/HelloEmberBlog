import { test } from 'qunit';
import moduleForAcceptance from 'hello-ember-blog/tests/helpers/module-for-acceptance';

import {
  authenticateSession
} from 'hello-ember-blog/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | blog post/edit', {
  needs: ['service:current-user'],

  beforeEach: function() {
    authenticateSession(this.application);
  }
});

test('if user is logged in he should can see edit button of his own post', function(assert) {
  server.create('post', { authorId: 1 });
  visit('/');

  andThen(function() {
    assert.equal(
      find('.blog-post-article__edit-button').length > 0,
      true,
      'user can edit his post'
    );
  });
});
