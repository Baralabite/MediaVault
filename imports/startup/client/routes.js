import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
    name: 'App.home',
    // triggersEnter: [checkForLogin],
    action() {
        BlazeLayout.render('App_body', { main: 'App_home' });
    }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};

FlowRouter.route('/login', {
  action(){
    BlazeLayout.render('ui_pages_login');
  }
});

function checkForLogin(){
  if(Meteor.userId()==undefined){
    FlowRouter.go("/login");
  }
}