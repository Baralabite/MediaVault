/**
 * Created by John Board on 15-Apr-17.
 */
import './renameFile.html';

Template.ui_modals_renameFile.events({
    "change .mv-renameFile": (event, template) => {
        Meteor.call("Files.methods.rename", {
            _id: template.data.file._id,
            newName: event.target.value
        });
        console.log(template.data.modalID);
        $('#'+template.data.modalID).modal('hide');
    }
});