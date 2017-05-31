/**
 * Created by John Board on 13-Apr-17.
 */
import './deleteFile.html';
import '../modalTemplate/modalTemplate.js';
import '../../components/fileList/fileList.js';


Template.ui_modals_deleteFile.events({
    "click .deleteFile": function(event, template){

        /*
        Using a wrapped callback in a setTimeout because otherwise for some reason the
         grey background behind the modal doesn't disappear when closing it - not sure why.
         */

        callback = () => {
            that = this;
            return function() {
                toastr.success("Deleted "+that.file.name, "Deleted file.");
                Meteor.call("Files.methods.delete", {_id: that.file._id});
            }
        };

        setTimeout(callback(), 200);
    }
});