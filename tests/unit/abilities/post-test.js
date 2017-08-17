import { moduleFor, test } from 'ember-qunit';

moduleFor('ability:post', 'Unit | Ability | post', {
  needs: ['service:current-user']
});

test('it exists', function(assert) {
  var ability = this.subject();
  assert.ok(ability);
});
