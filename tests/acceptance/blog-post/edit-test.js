import { test } from 'qunit';
import moduleForAcceptance from 'hello-ember-blog/tests/helpers/module-for-acceptance';

import {
  authenticateSession
} from 'hello-ember-blog/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | blog post/edit');

test('if user is logged in he should can see edit button of his own post', function(assert) {
  server.create('user', 'registered');
  authenticateSession(this.application);

  server.create('post', { authorId: 1000 });

  visit('/');

  andThen(function() {
    assert.equal(
      find('.blog-post-article__edit-button').length > 0,
      true,
      'user can edit his post'
    );
  });
});

test('if user is logged in he should can not see edit button of another user post', function(assert) {
  server.create('user', 'registered');
  authenticateSession(this.application);

  server.create('post');

  visit('/');

  andThen(function() {
    assert.equal(
      find('.blog-post-article__edit-button').length > 0,
      false,
      'user can\'t edit another user post'
    );
  });
});
