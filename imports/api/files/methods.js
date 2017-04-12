/**
 * Created by John Board on 12-Apr-17.
 */
import {Files} from "./files.js";

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
        } catch (ex){}
    }
});