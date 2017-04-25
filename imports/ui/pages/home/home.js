import './home.html';
import './home.less';

import '../../components/fileList/fileList.js';
import '../../modals/deleteFile/deleteFile.js';
import '../../components/spinner/spinner.js';
import { Files } from '../../../api/files/files.js';
import { queryFiles } from '../../../api/files/methods.js';
import '../../modals/uploadFile/uploadFile.js';

Template.App_home.onCreated(() => {
    Template.instance().subscribe("files");
});

Template.App_home.onRendered(() => {
    $("#uploadDropZone").dropzone({url: "/"});
});

Template.App_home.helpers({
    getFiles: () => {
        let query = FlowRouter.getQueryParam("search");
        query = query ? query : "";
        a = queryFiles.call({query: query});
        return a;
    }
});

Template.uploadForm.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
    currentUpload: function () {
        return Template.instance().currentUpload.get();
    }
});

Template.uploadForm.events({
    'change #fileInput': function (e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            // We upload only one file, in case
            // multiple files were selected
            var upload = Files.insert({
                file: e.currentTarget.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic',
            }, false);

            upload.on('start', function () {
                template.currentUpload.set(this);
            });

            upload.on('end', function (error, fileObj) {
                console.log(fileObj);
                if (error) {
                    //alert('Error during upload: ' + error);
                    toastr.error('Error during upload: ' + error, "Error")
                } else {
                    toastr.success('File "' + fileObj.name + '" successfully uploaded', "Uploaded.")
                }
                template.currentUpload.set(false);
            });

            upload.start();
        }
    }
});