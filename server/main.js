// ? Import package
import { Meteor } from 'meteor/meteor';

const os = require("os");

//? Import local
import getIp from '../utils/index';

//? Server
if (Meteor.isServer) {
  //? Startup
  Meteor.startup(function () {
    console.info("Meteor server started ✅");
  });

  //? Methods
  Meteor.methods({
   getHostname: function() {
     return os.hostname();
   },
   serverIp: function() {
    return getIp();
  }
 });
};
