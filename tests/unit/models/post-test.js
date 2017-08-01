import { moduleForModel, test } from 'ember-qunit';

moduleForModel('post', 'Unit | Model | post');

test('it exists', function(assert) {
  let model = this.subject();

  const actualAttributes = Object.keys(model.toJSON());

  const correctAttributes = [
    'title',
    'description',
    'author',
    'createdAt'
  ];

  assert.equal(
    actualAttributes.length,
    correctAttributes.length,
    `We are expecting ${correctAttributes.length} attributes, and have found ${actualAttributes.length}`
  );

  actualAttributes.forEach((actualKey) => {
    assert.equal(
      correctAttributes.indexOf(actualKey) > -1,
      true,
      `We are expecting ${actualKey} to be in the list of correctAttributes`
    );
  });
});
