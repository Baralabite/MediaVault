/**
 * Created by John Board on 14-Apr-17.
 */
import './fileItem.html';
import './fileItem.less';
import '../../modals/editTags/editTags.js';
import '../../modals/shareFile/shareFile.js';
import '../../modals/renameFile/renameFile.js';

import { Files } from '../../../api/files/files.js';

Template.ui_components_fileItem.onCreated(() => {
    uploaderName = new ReactiveVar();
    Template.instance().uploaderName = uploaderName;

    Meteor.call("Users.methods.getProfileName", {id: Template.instance().data.file.userId}, (err, res)=> {
        console.log(res);
        uploaderName.set(res);

    });
});

Template.ui_components_fileItem.helpers({
    getUploaderName: () => {
        return Template.instance().uploaderName.get();
    },

    getLink: (id) => {
        return Files.findOne(id).link();
    },

    getTagsModalID: (id) => {
        return "tagsModal_"+id;
    },

    getDeleteModalID: (id) => {
        return "delModal_"+id;
    },

    getShareModalID: (id) => {
        return "shareModal_"+id;
    },

    getRenameModalID: (id) => {
        return "renameModal_"+id;
    },

    getFileSize: (file) => {
        return (file.size / 1048576).toFixed(2);
    },

    getNumberOfDownloads: (file) => {
        file = Template.instance().data.file;
        return file.downloads ? file.downloads : 0;
    }
});

Template.ui_components_fileItem.events({
    "click .mv-downloadFile": function(){
        Meteor.call("Files.methods.incrementDownloads", {id: this.file._id});
    }
});