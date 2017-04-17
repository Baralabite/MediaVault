/**
 * Created by John Board on 07-Apr-17.
 */
import './fileList.html';
import '../fileItem/fileItem.js';
import '../spinner/spinner.js';
import { Files } from '../../../api/files/files.js';

Template.ui_components_fileList.onCreated(() => {
    Template.instance().subscribe("files");
});

Template.ui_components_fileList.helpers({
    getFiles: () => Template.instance().data.files,
    getFileDoc: (id) => {
        return Files.find(id).fetch()[0];
    },
    isEmpty: () => {
        return Template.instance().data.files.length == 0;
    }
});