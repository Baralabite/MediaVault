/**
 * Created by John Board on 12-Apr-17.
 */
import './login.html';
import './login.less';

Template.loginButtonsBig.events({
    'click a#loginGoogle': function(e, t) {
        e.preventDefault();
        console.log("Blah");
        Meteor.loginWithGoogle((error) => {
            if(error==undefined){
                FlowRouter.go("/");
            }
        });
    }
});