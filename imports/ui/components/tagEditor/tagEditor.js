/**
 * Created by John Board on 15-Apr-17.
 */
import './tagEditor.html';
import '../../components/spinner/spinner.js';
import { Tags } from '../../../api/tags/tags.js';

Template.ui_components_tagEditor.onCreated(function(){
    this.tagID = Template.instance().data.id+"_tagInput";
});

Template.ui_components_tagEditor.onRendered(function(){
    this.subscribe("tags.all");
    this.autorun(function(){
        initInputTags(Template.instance());
    });
});

Template.ui_components_tagEditor.helpers({
    getValues(){
        console.log();
        a = Tags.find({fileID: Template.instance().data.file._id}).fetch();
        b = _.map(a, (doc) => {
            console.log(doc);
            return doc.tagName;
        });
        return b.join(",");
    },
    render(){
        //initInputTags();
    },
    getTagID: () => Template.instance().tagID
});

Template.ui_components_tagEditor.events({
    "itemAdded .mv-tags": (event, template) => {
        //TODO Re-write using either methods, upsert, or both
        //Basically "if entry doesn't already exist, make it
        //The reason for having this is, on input init, it calls this method for whatever items are in the collection.
        doc = {
            fileID: template.data.file._id,
            tagName: event.item
        };
        id = Tags.findOne(doc);
        if(!id){
            Tags.insert(doc);
        }
    },

    "itemRemoved .mv-tags": (event, template) => {
        doc = {
            fileID: template.data.file._id,
            tagName: event.item
        };
        id = Tags.findOne(doc)._id;
        Tags.remove(id);
    }
});

function initInputTags(template){
    $("#"+template.tagID).tagsinput();
    fileID = template.data.file._id;
    _.forEach(Tags.find({fileID: fileID}).fetch(), (doc) => {
        $("#"+template.tagID).tagsinput("add", doc.tagName);
    });
}