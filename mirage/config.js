import faker from 'ember-cli-mirage';
import Response from 'ember-cli-mirage/response';
import formEncodedToJson from '../mirage/helpers/form-encoded-to-json'

export default function() {
  faker.locale = 'ru';

  this.namespace = '/api';

  this.get('/posts', (schema) => {
    return schema.posts.all();
  });

  this.post('/login', function({ users }, request){
    let params = formEncodedToJson(request.requestBody);

    let user = users.new({ login: 'user', password: '321321' });

    if(params.username === user.login && params.password === user.password) {
      return {
        "access_token":"PA$$WORD",
        "token_type":"bearer"
      };
    }
    else {
      let body = { errors: 'Email or password is invalid' };
      return new Response(401, {}, body);
    }
  });

  // this.get('/posts', ({ post }, request) => {
  //   const token = Ember.get(request, 'requestHeaders.Authorization');
  //   if (token === 'Bearer hotdog') {
  //     return post.all();
  //   } else {
  //     return new Mirage.Response(401, {}, {});
  //   }
  // });
}
