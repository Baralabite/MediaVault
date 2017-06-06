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
  let template = this;
  this.subscribe("tags.all");
  this.autorun(function(){
    initInputTags(Template.instance());
  });

  let chips = Template.instance().$('.chips');
  chips.on('chip.add', function(e, chip){
    doc = {
      fileID: template.data.file._id,
      tagName: chip.tag
    };
    id = Tags.findOne(doc);
    if(!id){
      Tags.insert(doc);
    }
  });

  chips.on('chip.delete', function(e, chip){
    doc = {
      fileID: template.data.file._id,
      tagName: chip.tag
    };
    id = Tags.findOne(doc)._id;
    Tags.remove(id);
  });
});

Template.ui_components_tagEditor.helpers({
    getTagID: () => Template.instance().tagID
});

function initInputTags(template){
  let fileID = template.data.file._id;
  let data = _.map(Tags.find({fileID: fileID}).fetch(), (doc) => {
    return { tag: doc.tagName }
  });

  template.$('.chips').material_chip({
    data: data
  });
}