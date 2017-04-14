/**
 * Created by John Board on 14-Apr-17.
 */
import { Mongo } from 'meteor/mongo';

export const Tags = new Mongo.Collection('tags');

Tags.schema = new SimpleSchema({
    fileID: {
        type: String
    },
    tagName: {
        type: String
    }
});

Tags.attachSchema(Tags.schema);