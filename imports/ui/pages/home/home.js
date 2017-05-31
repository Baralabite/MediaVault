import './home.html';
import './home.less';

import '../../components/fileList/fileList.js';
import '../../modals/deleteFile/deleteFile.js';
import '../../components/spinner/spinner.js';
import { getProfile } from '../../../api/users/methods.js';
import { queryFiles } from '../../../api/files/methods.js';
import { Files } from '../../../api/files/files.js';
import '../../modals/uploadFile/uploadFile.js';

Template.App_home.onCreated(() => {
  template = Template.instance();

  template.subscribe("files");

  template.getProfile = new ReactiveVar();
  getProfile.call(Meteor.userId(), (error, result) => {
    if(!error){
      console.log(result);
      template.getProfile.set(result);
    }
  });
});

Template.App_home.onRendered(() => {
  addPadding();
  window.onresize = addPadding;
  $(window).on("orientationchange", addPadding);

  console.log(Files.find().count);
  setTimeout(() => {
    if(Files.find().fetch().length === 0){
      $('.tap-target').tapTarget('open');
    }
  }, 3000);
});

function addPadding(){
  if(window.innerWidth > 900){
    console.log('more than');
    $("#__blaze-root").css("padding-left", "300px");
  } else {
    console.log('less than');
    $("#__blaze-root").css("padding-left", "0px");
  }
}

Template.App_home.helpers({
  getFiles: () => {
    let query = FlowRouter.getQueryParam("search");
    query = query ? query : "";
    return queryFiles.call({ query: query });
  },

  getProfile: () => Template.instance().getProfile.get(),
});