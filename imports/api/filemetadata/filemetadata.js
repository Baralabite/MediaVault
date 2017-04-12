/**
 * Created by John Board on 12-Apr-17.
 */
import { Mongo } from 'meteor/mongo';

export const FileMetadata = new Mongo.Collection('filemetadata');

FileMetadata.schema = new SimpleSchema({
    filename: {
        type: String
    },
    parent: {
        type: String,
        optional: true
    },
    fileOwner: {
        type: String,
        optional: true
    },
    creationDate: {
        type: Date,
        optional: true
    }
});

FileMetadata.attachSchema(FileMetadata.schema);