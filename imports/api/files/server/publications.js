/**
 * Created by John Board on 12-Apr-17.
 */
import { Meteor } from 'meteor/meteor';
import { Files } from '../files.js';

Meteor.publish('files', function () {
    return Files.find().cursor;
});