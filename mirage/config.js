import faker from 'ember-cli-mirage';
import Response from 'ember-cli-mirage/response';
import Ember from 'ember';

export default function() {
  faker.locale = 'ru';
  this.namespace = '/api';

  this.get('/posts');
  this.get('/posts/:id');

  this.get('/users/:id');

  this.post('/posts', (schema, request) => {
    let attrs = JSON.parse(request.requestBody).data;

    const authorization = request.requestHeaders.Authorization;
    const token = authorization.split(" ")[1];

    const userJson = JSON.parse(atob(token));
    const user = schema.users.find(userJson.id);

    Ember.set(attrs, 'createdAt', new Date());
    Ember.set(attrs, 'userId', user.id);

    if (attrs.attributes.title) {
      return schema.posts.create(attrs);
    }

    let body = { errors: 'Title can\'t be blank' };
    return new Response(400, {}, body);
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
