// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';

// Just for developing one user is being given the role of admin

console.log('started up!!');
console.log('Meteor.users find', Meteor.users.find({}).fetch());

const harry = Meteor.users.findOne({username: 'harry'});
console.log('harry', harry);
console.log('Roles', Roles);

// if (harry) {
//   Roles.addUsersToRoles([harry._id], 'admin', Roles.GLOBAL_GROUP);
// }
process.env.MAIL_URL = 'smtp://cbaarendse@gmail.com:284333@smtp.gmail.com:587';

Accounts.onCreateUser((options, user) => {
  // We're enforcing at least an empty profile object to avoid needing to check
  // for its existence later.
  user.profile = options.profile ? options.profile : {};
  return user;
});
