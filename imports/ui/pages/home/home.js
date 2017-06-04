import './home.html';
import './home.less';

import '../../components/fileList/fileList.js';
import '../../modals/deleteFile/deleteFile.js';
import '../../components/spinner/spinner.js';
import { getProfile } from '../../../api/users/methods.js';
import { queryFiles, getUserStorageConsumption } from '../../../api/files/methods.js';
import { Files } from '../../../api/files/files.js';
import '../../modals/uploadFile/uploadFile.js';

Template.App_home.onCreated(() => {
  template = Template.instance();

  template.subscribe("files");

  template.getProfile = new ReactiveVar();
  getProfile.call(Meteor.userId(), (error, result) => {
    if(!error){
      template.getProfile.set(result);
    }
  });
});

Template.App_home.onRendered(() => {
  addPadding();
  window.onresize = addPadding;
  $(window).on("orientationchange", addPadding);

  setTimeout(() => {
    if(Files.find().fetch().length === 0){
      $('.tap-target').tapTarget('open');
    }
  }, 3000);


});

function addPadding(){
  if(window.innerWidth > 991){
    $("#__blaze-root").css("padding-left", "300px");
  } else {
    $("#__blaze-root").css("padding-left", "0px");
  }
}

Template.App_home.helpers({
  getFiles: () => {
    let query = FlowRouter.getQueryParam("search");
    query = query ? query : "";
    return queryFiles.call({ query: query });
  },
  quotaExceeded: () => (1048576*50 < getUserStorageConsumption.call()),

  getStorageUsed: () => (getUserStorageConsumption.call() / 1048576).toFixed(2),

  getProfile: () => Template.instance().getProfile.get(),
});