/**
 * Created by John Board on 15-Apr-17.
 */
import './renameFile.html';

Template.ui_modals_renameFile.events({
  "click .mv-renameFile": (event, template) => {
    let newName = template.$(".mv-newFileName").val();
    Meteor.call("Files.methods.rename", {
      _id: template.data.file._id,
      newName: newName
    });
  }
});