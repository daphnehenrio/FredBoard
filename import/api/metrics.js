// ? Import package
import { Meteor } from 'meteor/meteor';

//? Import local
import { Metrics } from '../../lib/collections/metrics';

//? Server
//| On server startup, create some datas if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Metrics.find().count() === 0) {
      console.log("Metrics collection is empty, inserting some data");

      for (let i = 0; i < 10; i++) {
        Metrics.insert({
          label: `label ${i + 1}`,
          data: Math.floor(Random.fraction() * 10) * 5
        });
      }
    }
  });
}
