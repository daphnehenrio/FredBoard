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
  },
  getMongoPrimary: async function() {
    const db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
    const serverStatus = await db.admin().serverStatus();
    const primary = serverStatus.repl.primary;
    const hostname = primary.split(':')[0];
    const port = primary.split(':')[1];

    console.info('↪ 🍃🍃🍃🍃🍃 Mongo serverStatus: ', {
      host : serverStatus.host,
      version: serverStatus.version,
      repl: {
        hosts: serverStatus.repl.hosts,
        setName: serverStatus.repl.setName,
        setVersion: serverStatus.repl.setVersion,
        isWritablePrimary: serverStatus.repl.isWritablePrimary,
        secondary: serverStatus.repl.secondary,
        primary: serverStatus.repl.primary,
        me: serverStatus.repl.me,
      },
    });
    return { hostname, port };
  },
  getMongoUrl: function() {
    return process.env.MONGO_URL;
  }
 });
};
