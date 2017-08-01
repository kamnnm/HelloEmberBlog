import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `Title ${i}`;
  },
  description() {
    return faker.lorem.paragraphs(5);
  },
  createdAt() {
    faker.date.past();
  },
  user: association(),
});
