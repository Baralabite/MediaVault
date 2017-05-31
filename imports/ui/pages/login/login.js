/**
 * Created by John Board on 12-Apr-17.
 */
import './login.html';
import './login.less';

Template.loginButtonsBig.events({
    'click a#loginGoogle': function(e, t) {
        e.preventDefault();
        console.log("Blah");
        Meteor.loginWithGoogle({
            requestPermissions: ['email', 'profile']
          },
          (error) => {
            if(error==undefined){
                FlowRouter.go("/");
            } else {
                Materialize.toast("Google login not configured. Consult login.html for what to do.", 4000);
            }
        });
    }
});