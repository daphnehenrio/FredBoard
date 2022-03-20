import { Meteor } from 'meteor/meteor';
import { Template } from "meteor/templating";
import { ReactiveVar } from 'meteor/reactive-var'

import { Metrics } from '../lib/collections/metrics';

if (Meteor.isClient) {
  // ? onCreated
  Template.meteorServer.onCreated(function(){
    this.hostname = new ReactiveVar();
    Meteor.call("getHostname", (err, data) => {
      if(err) {
        throw err;
      }
      this.hostname.set(data);
    });
  });

  Template.ip.onCreated(function(){
    this.ip = new ReactiveVar();
    Meteor.call("serverIp", (err, data) => {
      if(err) {
        throw err;
      }
      this.ip.set(data);
    });
  });

  Template.board.onCreated(function(){
    Meteor.subscribe('metrics');
  })

  // ? helpers
  Template.board.helpers({
    metrics: function () {
      return Metrics.find();
    },
  });

  Template.meteorVersion.helpers({
    getMeteorVersion: function() {
      return Meteor.release; 
    },
  });

  Template.meteorServer.helpers({
    getMeteorServer: function(){
      return Template.instance().hostname.get();
    },
    isPair: function() {
      const hostName = Template.instance().hostname.get();
      if (!hostName) { return false; }
      let number = parseInt(hostName.substr(hostName.length - 1), 10);

      if (number === NaN) {
        return false;
      }
      if ((number % 2)) {
        return true;
      } else {
        return false;
      }
    }
  });

  Template.ip.helpers({
    getIpServer: function(){
      return Template.instance().ip.get();
    }
  })
}
