/**
 * Created by John Board on 12-Apr-17.
 */
import './navbar.html';
import './navbar.less';

Template.ui_components_navbar.onRendered(() => {
    $(".dropdown-button").dropdown();
});

Template.ui_components_navbar.helpers({
    getName: () => "MediaVault",
    getUsername: () => Meteor.user() ? Meteor.user().profile.name : "Not Logged In"
});

Template.ui_components_navbar.events({
  "keyup .mv-searchInput": (event, template) => {
    FlowRouter.setQueryParams({"search": event.target.value});
  },
  "click .mv-logout": () => {
    event.preventDefault();
    Meteor.logout(() => {
      location.reload();
    });
  },

  "submit": (event, template) => {
      event.preventDefault();
  },

  "keyup": (event, template) => {
    if(event.keyCode === 13){
      event.preventDefault();
      $(event.target).blur()
    } else {
      FlowRouter.setQueryParams({"search": event.target.value});
    }
  }
});