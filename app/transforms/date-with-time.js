import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
  deserialize(serialized) {
    return moment(serialized).format('MMMM Do YYYY, h:mm:ss a');
  },

  serialize(deserialized) {
    return moment(deserialized).format();
  }
});
