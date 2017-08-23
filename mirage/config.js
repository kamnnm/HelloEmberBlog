import Response from 'ember-cli-mirage/response';

export default function() {
  this.namespace = '/api';

  this.get('/posts');
  this.get('/posts/:id');

  this.get('/users/:id');

  this.get('/user', ({ users }, request) =>  {
    const authorization = request.requestHeaders.Authorization;
    const token = authorization.split(" ")[1];

    const userJson = JSON.parse(atob(token));
    const user = users.find(userJson.id);

    if (user) {
      return user;
    }

    let body = { errors: 'You are not authorized' };
    return new Response(401, {}, body);
  });

  this.post('/users');

  this.patch('/posts/:id');
  this.post('/posts', (schema, request) => {
    const authorization = request.requestHeaders.Authorization;
    const token = authorization.split(" ")[1];

    const userJson = JSON.parse(atob(token));
    const user = schema.users.find(userJson.id);

    let attrs = JSON.parse(request.requestBody).data;

    if (attrs.attributes.title) {
      attrs.createdAt = new Date();
      attrs.authorId = user.id;

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

export function testConfig() {
  this.post('/posts');

  this.get('/user', ({ users }) =>  {
    return users.find(1000) || users.create('registered');
  });
}
