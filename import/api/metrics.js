// ? Import package
import { Meteor } from 'meteor/meteor';

//? Import local
import { Metrics } from '../../lib/collections/metrics';

//? Server
// On server startup, create some datas if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Metrics.find().count() === 0) {
      const labels = ["label 1", "label 2", "label 3"];
      labels.forEach(function (label) {
        Metrics.insert({
          label,
          data: Math.floor(Random.fraction() * 10) * 5
        });
      });
    }
  });
}
