import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

Router.route('', {path: '/'});

Router.route('/error', function () {
  console.log('Simulating error...');
  process.exit(2);
}, { where: 'server' });
