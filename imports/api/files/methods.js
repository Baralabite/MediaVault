/**
 * Created by John Board on 12-Apr-17.
 */
import { Files } from "./files.js";
import { Tags } from "../tags/tags.js";

export const deleteFile = new ValidatedMethod({
    name: "Files.methods.delete",
    validate: new SimpleSchema({
        _id: {
            type: String
        }
    }).validator(),
    run: ({_id}) => {
        try {
            Files.remove(_id);
            Tags.remove({fileID: _id});
        } catch (ex){}
    }
});

export const renameFile = new ValidatedMethod({
    name: "Files.methods.rename",
    validate: new SimpleSchema({
        _id: {
            type: String
        },
        newName: {
            type: String
        }
    }).validator(),
    run: ({_id, newName}) => {
        Files.update(_id, {$set: {name: newName}});
    }
});

export const queryFiles = new ValidatedMethod({
    name: "Files.methods.query",
    validate: new SimpleSchema({
        query: {
            type: String,
            defaultValue: ""
        }
    }).validator(),
    run: ({query}) => {
        /* Generates RegExp pattern from space seperated search strings */
        queryString = ".*"+query.split(" ").join("|")+".*";
        queryRegExp = new RegExp(queryString);

        files = Files.find({"name": queryRegExp}).fetch();
        endFiles = _.map(files, (doc) => doc._id);

        tags = Tags.find({tagName: queryRegExp}).fetch();
        endTags =  _.map(tags, (doc) => doc.fileID);

        return _.uniq(endFiles.concat(endTags));
    }
});