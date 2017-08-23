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
  login() {
    return faker.internet.userName();
  },
  password() {
    return faker.internet.password();
  },
  registered: trait({
    id: 1000,
    login: 'user',
    password: '321321',
    firstName: 'Foo',
    lastName: 'Bar'
  })
});
