/**
 * Created by John Board on 07-Apr-17.
 */
import './fileList.html';
import { Files } from '../../../api/files/files.js';

Template.ui_components_fileList.onCreated(() => {
    Meteor.subscribe("files");
});

Template.ui_components_fileList.helpers({
    getFiles: () => {
        return Files.find().fetch();
    }
});

Template.fileItem.helpers({
    getLink: (id) => {
        return Files.findOne(id).link();
    }
});

Template.fileItem.events({
    "click .mv-editFile": function(event, template){
        console.log(this.doc._id);
        console.log(this.doc)
    },

    "click .mv-deleteFile": function(event, template){
        Meteor.call("Files.methods.delete", {_id: this.doc._id});
    }
});