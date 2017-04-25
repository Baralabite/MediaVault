/**
 * Created by John Board on 15-Apr-17.
 */
import { Files } from '../../../api/files/files.js';
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

Template.ui_modals_renameFile.helpers({
    getFileName: () => {
        return Files.findOne(Template.instance().data.file._id).fetch()[0].name;
    }
})