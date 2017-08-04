import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({
  firstName() {
    return faker.name.firstName();
  },
  lastName() {
    return faker.name.lastName();
  },
  email() {
    return faker.internet.email();
  },
  registered: trait({
    login: 'user',
    password: '321321'
  })
});
