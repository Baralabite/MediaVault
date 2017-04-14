/**
 * Created by John Board on 07-Apr-17.
 */
import './fileList.html';
import '../fileItem/fileItem.js';

import { Files } from '../../../api/files/files.js';

Template.ui_components_fileList.onCreated(() => {
    Meteor.subscribe("files");
});

Template.ui_components_fileList.helpers({
    getFiles: () => {
        return Files.find().fetch();
    }
});