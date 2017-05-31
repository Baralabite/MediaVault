/**
 * Created by John Board on 14-Apr-17.
 */
import './fileItem.html';
import './fileItem.less';
import '../../modals/editTags/editTags.js';
import '../../modals/shareFile/shareFile.js';
import '../../modals/renameFile/renameFile.js';
import '../spinner/spinner.js'

import { Files } from '../../../api/files/files.js';

Template.ui_components_fileItem.onCreated(() => {
    uploaderName = new ReactiveVar();
    Template.instance().uploaderName = uploaderName;

    Meteor.call("Users.methods.getProfileName", {id: Template.instance().data.file.userId}, (err, res)=> {
        uploaderName.set(res);

    });
});

Template.ui_components_fileItem.onRendered(() => {
  Template.instance().$('.dropdown-button').dropdown();
});

Template.ui_components_fileItem.helpers({
  getUploaderName: () => Template.instance().uploaderName.get(),
  getFileName: () => Template.instance().data.file.name.split(".")[0],
  getLink: (id) => Files.findOne(id).link(),
  getTagsModalID: (id) => "tagsModal_"+Template.instance().data.file._id,
  getDeleteModalID: (id) => "delModal_"+Template.instance().data.file._id,
  getShareModalID: (id) => "shareModal_"+Template.instance().data.file._id,
  getRenameModalID: (id) => "renameModal_"+Template.instance().data.file._id,
  getFileSize: () => (Template.instance().data.file.size / 1048576).toFixed(2),
  getNumberOfDownloads: (file) => {
    file = Template.instance().data.file;
    return file.downloads ? file.downloads : 0;
  }
});

Template.ui_components_fileItem.events({
  "click .mv-downloadFile": function(){
      Meteor.call("Files.methods.incrementDownloads", {id: this.file._id});
  },

  "contextmenu": (event, template) => {
    event.preventDefault();
    console.log(template.$(".dropdown-button"));
    console.log(template.$('.dropdown-content'));
    template.$(".dropdown-button").dropdown('open');
    template.$('.dropdown-content').css({left: event.clientX, top:event.clientY});
  }
});