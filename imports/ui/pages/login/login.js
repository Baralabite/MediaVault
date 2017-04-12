/**
 * Created by John Board on 12-Apr-17.
 */
import './login.html';
import './login.less';

Template.loginButtonsBig.events({
    'click a#loginGoogle': function(e, t) {
        e.preventDefault();

        Meteor.loginWithGoogle({
            requestOfflineToken: 'true'
        }, FlowRouter.go('user'));
    }
});