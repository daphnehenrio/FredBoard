import { WebApp } from 'meteor/webapp';

if (Meteor.isServer) {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log({
      method: req.method,
      url: req.url,
      ip: req.connection.remoteAddress,
      httpVersion: req.httpVersion,
      time: new Date().toISOString(),
      resStatus: res.statusCode,
    })
    next();
  });  
}