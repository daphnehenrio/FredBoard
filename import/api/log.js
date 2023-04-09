import { WebApp } from 'meteor/webapp';

if (Meteor.isServer) {
  WebApp.connectHandlers.use((req, res, next) => {
    console.log({
      time: new Date().toISOString(),
      ip: req.socket.remoteAddress,
      method: req.method,
      url: req.url,
      httpVersion: req.httpVersion,
      resStatus: res.statusCode,
    })
    next();
  });  
}
