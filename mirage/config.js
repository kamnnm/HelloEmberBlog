import faker from 'ember-cli-mirage';
import Response from 'ember-cli-mirage/response';
import Ember from 'ember';

export default function() {
  faker.locale = 'ru';

  this.namespace = '/api';

  this.get('/posts');

  this.post('/posts', ({ posts }) => {
    let attrs = this.normalizedRequestAttrs();

    Ember.set(attrs, 'createdAt', new Date());

    return posts.create(attrs);
  });

  this.post('/token', ({ users }, request) =>  {
    const params = JSON.parse(request.requestBody);

    const login = params.auth.login;
    const password = params.auth.password;

    const user = users.findBy({ login, password });

    if(user) {
      const userJson = JSON.stringify({
        id: user.id,
        email: user.email,
        login: user.login
      });

      return new Response(201, {}, {
        token: btoa(userJson),
        token_type: 'jwt'
      });
    }

    let body = { errors: 'Email or password is invalid' };
    return new Response(401, {}, body);
  });
}
