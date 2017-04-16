/**
 * Created by John Board on 12-Apr-17.
 */
import './navbar.html';

Template.ui_components_navbar.helpers({
    getName: () => "MediaVault"
});

Template.ui_components_navbar.events({
    "change .mv-searchInput": (event, template) => {
        FlowRouter.setQueryParams({"search": event.target.value});
    }
});