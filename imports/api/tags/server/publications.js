/**
 * Created by John Board on 14-Apr-17.
 */
import { Meteor } from 'meteor/meteor';
import { Tags } from '../tags.js';

Meteor.publish("tags.all", function() {
    return Tags.find();
});