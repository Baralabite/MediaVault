/**
 * Created by John Board on 14-Apr-17.
 */
import './editTags.html';
import { Tags } from '../../../api/tags/tags.js';

Template.ui_modals_editTags.onCreated(function(){
    this.subscribe("tags.all");
});

Template.ui_modals_editTags.onRendered(function(){
    console.log("Rendering inputs");
    this.$('.mv-tags').tagsinput();
    console.log(this);
});

Template.ui_modals_editTags.helpers({
    getTags: () => {

    }
});