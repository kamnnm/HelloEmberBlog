import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace: 'api',
  host: config.host,
  authorizer: 'authorizer:bearer',
});
