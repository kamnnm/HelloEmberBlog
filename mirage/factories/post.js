import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({
  title() {
    return faker.lorem.sentence();
  },
  description() {
    return faker.lorem.paragraphs(2);
  },
  createdAt() {
    return faker.date.past();
  },
  updatedAt: null,
  user: association(),
});
