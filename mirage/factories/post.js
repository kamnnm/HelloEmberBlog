import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `Title ${i}`;
  },
  description: faker.lorem.paragraphs(5),
  author: `${faker.name.firstName()} ${faker.name.lastName()}`,
  createdAt: faker.date.past()
});
