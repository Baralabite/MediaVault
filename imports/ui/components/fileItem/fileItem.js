/**
 * Created by John Board on 14-Apr-17.
 */
import './fileItem.html';
import './fileItem.less';
import '../../modals/editTags/editTags.js';
import '../../modals/shareFile/shareFile.js';

import { Files } from '../../../api/files/files.js';

Template.ui_components_fileItem.helpers({
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
    }
});

Template.ui_components_fileItem.events({
    "click .mv-editFile": function(event, template){
        console.log(this.file._id);
        console.log(this.file)
    },
});