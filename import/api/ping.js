import { WebApp } from 'meteor/webapp';

if (Meteor.isServer) {
  WebApp.connectHandlers.use('/ping', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok' }));
  }); 
}
