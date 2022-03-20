// ? Import package
import { Meteor } from 'meteor/meteor';

const os = require("os");

//? Function
const getIp = function() {
  const netInterfaces = os.networkInterfaces();
  const result = [];
  for (let id in netInterfaces) {
    const netFace = netInterfaces[id];
    for (let i = 0; i < netFace.length; i++) {
      const ip = netFace[i];
      if (ip.internal === false && ip.family === 'IPv4') {
        result.push(ip.address);
      }
    }
  }
  // log info result
  if (result.length === 0) {
    console.log("NO IP ADDRESS FOUND");
  }
  if (result.length > 1) {
    console.log("MORE THAN ONE IP ADDRESS FOUND");
  }
  return result[0];
}

//? Server
if (Meteor.isServer) {
  Meteor.startup(function () {
  });
 Meteor.methods({
   getHostname: function() {
     return os.hostname();
   },
   serverIp: function() {
    return getIp();
  }
 });
};