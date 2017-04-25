/**
 * Created by John Board on 17-Apr-17.
 */

export const getProfileName = new ValidatedMethod({
    name: "Users.methods.getProfileName",
    validate: new SimpleSchema({
        id: {
            type: String
        }
    }).validator(),
    run: ({id}) => {
        return Meteor.users.findOne(id).profile.name;
    }
});