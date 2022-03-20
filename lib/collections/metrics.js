// ? Import package
import { Meteor } from 'meteor/meteor';
import { Mongo } from "meteor/mongo";
import SimpleSchema from 'simpl-schema';

// ? Publish
if (Meteor.isServer) {
  Meteor.publish('metrics', function() {
    return Metrics.find();
  });
}

// ? Export the collection
export const Metrics = new Mongo.Collection('metrics');
export const metricsSchema = new SimpleSchema({
  label: {
    type: String,
  },
  data: {
    type: Number,
  },
});
