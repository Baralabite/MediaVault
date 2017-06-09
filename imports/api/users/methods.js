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
      try{
        return Meteor.users.findOne(id).profile.name;
      } catch (ex) {
        return undefined;
      }
    }
});

export const getProfile = new ValidatedMethod({
  name: "Users.methods.getProfile",
  validate: () => undefined,
  run: (id) => {
    return Meteor.users.findOne(id)
  }
});

export const getProfilePicture = new ValidatedMethod({
  name: "Users.methods.getProfilePicture",
  validate: () => undefined,
  run: (id) => {
    if(Meteor.isClient){
      return false;
    }
    return getProfile.call(id).services.google.picture;
  }
});

export const getUsers = new ValidatedMethod({
  name: "Users.methods.getUsers",
  validate: () => undefined,
  run: () => {
    return Meteor.users.find().fetch();
  }
});