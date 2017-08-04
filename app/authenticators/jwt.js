import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';

const { RSVP,
        $: { ajax },
        run } = Ember;

export default Base.extend({
  tokenEndpoint: `${config.host}/api/token`,

  restore(data) {
    return new RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(options) {
    const { login, password } = options;

    const data = JSON.stringify({
      auth: {
        login,
        password
      }
    });

    const requestOptions = {
      url: this.tokenEndpoint,
      type: 'POST',
      data,
      contentType: 'application/json',
      dataType: 'json'
    };

    return new RSVP.Promise((resolve, reject) => {
      ajax(requestOptions).then(function(response) {
        run(function() {
          resolve({
            token: response.token
          });
        });
      }, function(xhr) {
        const response = xhr.responseJSON;
        run(function() {
          reject(response);
        });
      });
    });
  },

  invalidate: function() {
    return RSVP.resolve();
  }
});
