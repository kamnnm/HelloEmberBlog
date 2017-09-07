import { test } from 'qunit';
import moduleForAcceptance from 'hello-ember-blog/tests/helpers/module-for-acceptance';
import Ember from 'ember';
import { faker } from 'ember-cli-mirage';

import {
  currentSession,
  authenticateSession,
  invalidateSession
} from 'hello-ember-blog/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | login form');

test('if a user is not logged in, he see a login form', function(assert) {
  invalidateSession(this.application);
  visit('/');

  andThen(function() {
    const loginFormPresent = find('.user-login-form').length > 0 ? true : false;
    assert.equal(loginFormPresent, true);
  });
});

test('if a user is logged in, he see a logout form', function(assert) {
  authenticateSession(this.application);
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    const logoutBtnPresent = find('.user-logout').length > 0 ? true : false;
    assert.equal(
      logoutBtnPresent,
      true,
      'An authenticated user should see the logout button'
    );

    const loginFormPresent = find('.user-login-form').length > 0 ? true : false;
    assert.equal(
      loginFormPresent,
      false,
      'An authenticated user should not see the login form'
    );
  });
});

test('user can logout', function(assert) {
  authenticateSession(this.application);
  visit('/');
  click('.user-logout');

  andThen(() => {
    const curSession = currentSession(this.application);
    const isAuth = Ember.get(curSession, 'isAuthenticated');
    assert.equal(
      isAuth,
      false,
      'After clicking logout, the user is no longer logged in'
    );
  });
});

test('user can login', function(assert) {
  invalidateSession(this.application);
  visit('/');

  server.createList('user', 1, 'registered');

  andThen(() => {
    const userName = 'user';
    const password = '321321';

    fillIn('.user-login-form__login-input', userName);
    fillIn('.user-login-form__password-input', password);
    click('.user-login-form__submit');
  }).andThen(() => {
    const curSession = currentSession(this.application);
    const isAuth = Ember.get(curSession, 'isAuthenticated');
    assert.equal(
      isAuth,
      true,
      'after a users submits good creds to login form, they are logged in'
    );

    const loginFormPresent = find('.user-login-form').length > 0 ? true : false;
    assert.equal(
      loginFormPresent,
      false,
      'after user logged in, the login form disappears'
    )
  });
});

test('If a user puts in the wrong login credentials, they see a login error', function(assert) {
  invalidateSession(this.application);
  visit('/');

  const userName = faker.internet.userName();
  const password = faker.internet.password();

  fillIn('.user-login-form__login-input', userName);
  fillIn('.user-login-form__password-input', password);
  click('.user-login-form__submit');

  andThen(() => {
    const curSession = currentSession(this.application);
    const isAuth = Ember.get(curSession, 'isAuthenticated');
    assert.equal(
      isAuth,
      false,
      'User submits bad username and password, fails'
    );

    const isShowingLoginFails = find('.user-login-form__error').length > 0 ? true : false;
    assert.equal(
      isShowingLoginFails,
      true,
      'Shows user an error when they put in bad deets'
    );

    const loginFormPresent = find('.user-login-form').length > 0 ? true : false;
    assert.equal(
      loginFormPresent,
      true,
      'and we still can see the login form'
    )
  });
});
