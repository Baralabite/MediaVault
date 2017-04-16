/**
 * Created by John Board on 12-Apr-17.
 */
import './methods.js';

export const Files = new FilesCollection({
    collectionName: 'files',
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload: () => true,
    storagePath: Meteor.absolutePath + '/fileStore',
    allow: {
        insert: () => true,
        update: () => true
    }
});

//Files.createIndex( { name: "text", description: "text" } )