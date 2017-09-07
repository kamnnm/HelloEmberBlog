import { moduleFor, test } from 'ember-qunit';

moduleFor('route:register', 'Unit | Route | register', {
  needs: ['service:session', 'service:authenticateUser', 'service:flashMessages']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
