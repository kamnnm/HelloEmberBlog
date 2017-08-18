import { test } from 'qunit';
import moduleForAcceptance from 'hello-ember-blog/tests/helpers/module-for-acceptance';
import { faker } from 'ember-cli-mirage';

import {
  authenticateSession,
  invalidateSession
} from 'hello-ember-blog/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | blog post create');

test('if user is not logged in, he should not see a blog post create form', function(assert) {
  invalidateSession(this.application);
  visit('/');

  andThen(function() {
    const blogPostFormPresent = find('.blog-post-form').length > 0 ? true : false;
    assert.equal(
      blogPostFormPresent,
      false,
      'An authenticated user should not see post create form'
    );
  });
});

test('if user is logged in, he should see a blog post create form', function(assert) {
  authenticateSession(this.application);
  visit('/');

  andThen(function() {
    const postCreateBtnPresent = find('.blog-post-form__submit').length > 0 ? true : false;
    assert.equal(
      postCreateBtnPresent,
      true,
      'An authenticated user should see post create button'
    );

    const blogPostFormPresent = find('.blog-post-form').length > 0 ? true : false;
    assert.equal(
      blogPostFormPresent,
      true,
      'An authenticated user should see post create form'
    );
  });
});

test('registered user should can create blog post', function(assert) {
  authenticateSession(this.application);
  visit('/');

  const title = faker.lorem.sentence();
  const description = faker.lorem.paragraphs(1);

  fillIn('.blog-post-form__title-input', title);
  fillIn('.blog-post-form__description-input', description);
  click('.blog-post-form__submit');

  andThen(() => {
    assert.equal(find('.blog-post-article__title').first().text().trim(), title);
    assert.equal(find('.blog-post-article__description').first().text().trim(), description);
  });
});

test('user should not can create blog post without title', function(assert) {
  authenticateSession(this.application);
  visit('/');

  const description = faker.lorem.paragraphs(1);

  fillIn('.blog-post-form__description-input', description);
  click('.blog-post-form__submit');

  andThen(() => {
    assert.equal(find('.has-error .blog-post-form__title-input').length > 0, true);
    assert.equal(find('.blog-post-form__error').length > 0 , true);
    assert.notEqual(find('.blog-post-article__description').first().text().trim(), description);
  });
});
