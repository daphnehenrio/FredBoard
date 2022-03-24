import { Meteor } from 'meteor/meteor';
import { Template } from "meteor/templating";
import { ReactiveVar } from 'meteor/reactive-var'

import { Metrics } from '../lib/collections/metrics';

interval = 0;

if (Meteor.isClient) {
  //? Constants
  const usrStorage = window.localStorage;
  const isTrue = (value) => value === 'true';
  

  const reload = () => {
    interval = Meteor.setInterval(() => {
      if (isTrue(usrStorage.getItem('reload'))) {
        window.location.reload()
      }
    }, 5000);
    return interval;
  };

  // ? onCreated
  Template.body.onCreated(function bodyOnCreated() { 
    if (!usrStorage.getItem('reload')) {
      usrStorage.setItem('reload', "false");
    }
   });

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
  });

  Template.refreshToggle.onCreated(function(){
    this.checked = new ReactiveVar(isTrue((usrStorage.getItem('reload'))));

    if(this.checked.get()){
      interval = reload();
    } else {
      Meteor.clearInterval(interval);
    }
  });

  Template.refreshToggle.onDestroyed(function () {
    Meteor.clearInterval(this.interval);
  });

  // ? helpers
  Template.board.helpers({
    /**
     * @description Get the metrics from the database
     * @returns Array - metrics
     */
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

    /**
     * @description Check if the last number of hostname is pair
     * @returns Boolean
     */
    isPair: function() {
      const hostName = Template.instance().hostname.get();
      if (!hostName) { return false; }
      
      const number = parseInt(hostName.substr(hostName.length - 1), 10);
      if (number === NaN || !(number % 2)) {
        return false;
      } else {
        return true;
      }
    }
  });

  Template.ip.helpers({
    getIpServer: function(){
      return Template.instance().ip.get();
    }
  })

  Template.refreshToggle.helpers({
    checked: function(){
      return Template.instance().checked.get();
    }
  })


  Template.refreshToggle.events({
    'click .js-toggle-refresh': function() {
      const checked = !Template.instance().checked.get();

      checked ? reload() : Meteor.clearInterval(interval);

      usrStorage.setItem('reload', checked);
      Template.instance().checked.set(checked);
    }
  });
}
