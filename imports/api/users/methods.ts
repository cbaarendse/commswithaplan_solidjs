// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Match} from 'meteor/check';

import {Settings, ReachAppUser, UsersMethods, usernameRegExp, emailRegExp, passwordRegExp} from './users';
import {TOUCHPOINTSNAMES, COMPANY_ALL_ROLES} from '../../both/constants';

// TODO: stripe methods here????
// TODO: set up basic methods, then combine these in actual needed methods. Advantages: use async await on server; just result in callback, no error;
/**
 *VALIDATED METHODS:
 * 1. FIND
 * 2. CRUD
 * 3.PERMISSIONS
 * METEOR METHODS
 * 4.VERIFICATION
 **/
// 1. FIND
export const usersFindUserByEmail = new ValidatedMethod({
  name: 'users.findUserByEmail',
  //mixins: [CallPromiseMixin],
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.email, String) || !emailRegExp.test(args.email)) {
      throw new Meteor.Error('users.signup.email', 'Invalid email address', '[{ "name": "invalidEmail" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('users.findUserByEmail runs with', args.email);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    let user;
    if (Meteor.isServer) {
      user = Accounts.findUserByEmail(args.email);
      if (!user) {
        throw new Meteor.Error(
          'users.general.emailUnknown',
          'This email is not in ReachApp',
          '[{ "name": "emailUnknown"}]'
        );
      }
    }
    return user;
  }
});

export const usersFindUserIdByEmail = new ValidatedMethod({
  name: 'users.findUserIdByEmail',
  //mixins: [CallPromiseMixin],
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.email, {address: String, verified: Boolean}) || !emailRegExp.test(args.email)) {
      throw new Meteor.Error('users.signup.email', 'Invalid email address', '[{ "name": "invalidEmail" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('users.findUserIdByEmail runs with', args.email);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (Meteor.isServer) {
      const user = Accounts.findUserByEmail(args.email);
      console.log('user in usersFindUserIdByEmail ', user);
      if (!user) {
        return undefined;
      }
      return user._id;
    }
    return undefined;
  }
});

export const usersFindUserIdByUsername = new ValidatedMethod({
  name: 'users.findUserIdByUsername',
  // mixins: [CallPromiseMixin],
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.username, String) || !usernameRegExp.test(args.username)) {
      throw new Meteor.Error('users.signup.username', 'Invalid username', '[{ "name": "invalidUsername" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('users.findUserIdByUsername runs with', args.username);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    let user;
    if (Meteor.isServer) {
      user = Accounts.findUserByUsername(args.username);
      if (!user) {
        throw new Meteor.Error('Username unknown', 'This username is not in ReachApp', '[{ "name": "unknown"}]');
      }
      return user._id;
    }
    return undefined;
  }
});

export const usersFindEmailByUsername = new ValidatedMethod({
  name: 'users.findEmailByUsername',
  //mixins: [CallPromiseMixin],
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.username, String) || !usernameRegExp.test(args.username)) {
      throw new Meteor.Error('users.signup.username', 'Invalid username', '[{ "name": "invalidUsername" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('users.findEmailByUsername runs with', args.username);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    let user: Meteor.User | undefined | null;
    if (Meteor.isServer) {
      user = Accounts.findUserByUsername(args.username);
      if (!user) {
        throw new Meteor.Error(
          'users.general.usernameUnknown',
          'This username is not in ReachApp',
          '[{ "name": "usernameUnknown"}]'
        );
      }
      return user.emails ? user.emails[0].address : undefined;
    }
    //    return undefined;
  }
});

export const usersFindEmailById = new ValidatedMethod({
  name: 'users.findEmailById',
  //mixins: [CallPromiseMixin],
  validate(args: {[key: string]: string}) {
    if (!Match.test(args._id, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('users.findEmailById runs with', args._id);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    let email: string | undefined;
    if (Meteor.isServer) {
      const user: Meteor.User | undefined = Meteor.users.findOne({_id: args._id})
        ? Meteor.users.findOne({_id: args._id})
        : undefined;
      if (user) {
        email = user.emails ? user.emails[0].address : undefined;
      }
      if (!email) {
        throw new Meteor.Error('users.general.idUnknown', 'This id is not in ReachApp', '[{ "name": "idUnknown"}]');
      }
    }
    return email;
  }
});

export const usersFindIdsByRole = new ValidatedMethod({
  name: 'users.findIdsByRole',
  // mixins: [CallPromiseMixin],
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.role, String) || !Match.test(args.companyId, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('findIdsByRole runs with ', args.role, args.companyId);

    const allRoles = COMPANY_ALL_ROLES;
    console.log('allRoles :', allRoles);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (allRoles.indexOf(args.role) === -1) {
      throw new Meteor.Error(
        'users.general.notARole',
        'This is not an existing role in ReachApp',
        '[{ "name": "notARole" }]'
      );
    }
    const users: Meteor.User[] = Roles.getUsersInRole(args.role, args.companyId).fetch();
    console.log('users in findIdsByRole :', users);
    // UNDEFINED, OTHERWISE IT GOES IN MAILTO: LINK
    if (!users) {
      return undefined;
    }

    return users.map((user: Meteor.User) => {
      return user._id;
    });
  }
});

// 2. CRUD
export const usersRemove = new ValidatedMethod({
  name: 'users.remove',
  //mixins: [CallPromiseMixin],
  validate(args: {[key: string]: string}) {
    if (!Match.test(args._id, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('usersRemove runs with ', args.userId);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (!Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to remove a user',
        '[{ "name": "notAuthorized" }]'
      );
    }
    if (Meteor.isServer) {
      /** REMOVE BLOCKS UNTIL THE DATABASE ACKNOWLEDGES THE WRITE AND THEN RETURNS THE NUMBER OF REMOVED DOCUMENTS, 
      OR THROWS AN EXCEPTION IF SOMETHING WENT WRONG. **/
      return Meteor.users.remove({_id: args.userId});
    }
  }
});

export const usersCreateUser = new ValidatedMethod({
  name: 'users.createUser',
  // mixins: [CallPromiseMixin],
  validate(options: {[key: string]: string}) {
    // NO PASSWORD NEEDED; TO BE ASKED LATER, FOR EXAMPLE WITH ENROLLMENT
    if (!Match.test(options.username, String) || !usernameRegExp.test(options.username)) {
      throw new Meteor.Error('users.signup.username', 'Invalid username', '[{ "name": "invalidUsername" }]');
    }
    if (!Match.test(options.email, String) || !emailRegExp.test(options.email)) {
      throw new Meteor.Error('users.signup.email', 'Invalid email address', '[{ "name": "invalidEmail" }]');
    }
    if (options.password) {
      if (!Match.test(options.password, String) || !passwordRegExp.test(options.password)) {
        throw new Meteor.Error('users.signup.password', 'Invalid password', '[{ "name": "invalidPassword" }]');
      }
    }
  },
  run(this: Meteor.MethodThisType, options: {[key: string]: string}) {
    console.log('users.createUsers runs with: ', options, typeof options.email);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // BECAUSE ON SERVER RETURNS USERID, NO CALLBACK FOR ERRORS
    if (Meteor.isServer) {
      return Accounts.createUser(options);
    }
  }
});

export const usersSetUsername = new ValidatedMethod({
  name: 'users.setUsername',
  //mixins: [CallPromiseMixin],
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.userId, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
    if (!Match.test(args.username, String) || !usernameRegExp.test(args.username)) {
      throw new Meteor.Error('users.signup.username', 'Invalid username', '[{ "name": "invalidUsername" }]');
    }
  },
  // NO PASSWORD NEEDED; TO BE ASKED LATER WITH ENROLLMENT
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // BECAUSE ON SERVER RETURNS USERID, NO CALLBACK FOR ERRORS
    if (Meteor.isServer) {
      return Accounts.setUsername(args.userId, args.username);
    }
  }
});

export const usersSetPassword = new ValidatedMethod({
  name: 'users.setPassword',
  //mixins: [CallPromiseMixin],
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.userId, String) || !usernameRegExp.test(args.userId)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
    if (!Match.test(args.password, String) || !passwordRegExp.test(args.password)) {
      throw new Meteor.Error('users.signup.password', 'Invalid password', '[{ "name": "invalidPassword" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // BECAUSE ON SERVER RETURNS USERID, NO CALLBACK FOR ERRORS
    if (Meteor.isServer) {
      return Accounts.setPassword(args.userId, args.password);
    }
  }
});

export const usersUpdate = new ValidatedMethod({
  name: 'users.update',
  //mixins: [CallPromiseMixin],
  validate(args: UsersMethods) {
    if (!Match.test(args._id, String) || !Match.test(args.modifier, Object)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: UsersMethods) {
    console.log('usersUpdate runs with ', args._id, args.modifier);
    // CHECK IF USER IS LOGGED IN
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // CHECK IF USER WANTS TO UPDATE OTHER USER
    if (args._id !== this.userId) {
      // CHECK IF USER IS AUTHORIZED TO UPDATE OTHER USER
      if (
        !Roles.userIsInRole(this.userId, ['owner', 'companyAdmin']) &&
        !Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)
      ) {
        throw new Meteor.Error(
          'Not authorized',
          'You are not authorized to udate a user',
          '[{ "name": "notAuthorized" }]'
        );
      }
    }
    if (Meteor.isServer) {
      let user: ReachAppUser | null | undefined;
      if (args.modifier.emails !== undefined) {
        user = Accounts.findUserByEmail(args.modifier.emails[0].address);
      }
      // CHECK IF EMAIL ALREADY EXISTS IN DATABASE, IF NOT, OR IF EMAIL IS OF USER TO BE UPDATED,
      // UDATE USER DOCUMENT
      if (!user || user._id === args._id) {
        Meteor.users.update({_id: args._id}, args.modifier);
      } else {
        throw new Meteor.Error(
          'users.update.emailExists',
          'Email exists already for another user',
          '[{ "name": "emailExists" }]'
        );
      }
    }
  }
});

export const usersSaveSettings = new ValidatedMethod({
  name: 'users.saveSettings',
  validate(args: Settings) {
    if (!Match.test(args, Object)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: Settings) {
    console.log('usersSaveSettings runs with ', args);
    const companiesForUser: string[] = Roles.getGroupsForUser({user: this.userId});
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    } else if (companiesForUser.indexOf(args.lastCompanyId) === -1) {
      throw new Meteor.Error(
        'users.general.notAuthorized',
        'User is not authorized for this company',
        '[{ "name": "notAuthorized" }]'
      );
    } else {
      // UPDATE IN COLLECTION2 RETURNS ERROR MESSAGES TO CLIENT
      Meteor.users.update(
        {_id: this.userId},
        {
          $set: {
            'profile.lastLanguage': args.lastLanguage,
            'profile.lastCompanyId': args.lastCompanyId,
            'profile.lastBrandId': args.lastBrandId,
            'profile.lastProductId': args.lastProductId,
            'profile.lastStrategyId': args.lastStrategyId,
            'profile.lastCampaignDataType': args.lastCampaignDataType,
            'profile.lastRoute': args.lastRoute
          }
        }
      );
    }
  }
});

// 3. PERMISSIONS
export const usersIsInRoles = new ValidatedMethod({
  name: 'users.isInRoles',
  //mixins: [CallPromiseMixin],
  validate(args: UsersMethods) {
    if (!Match.test(args.roles, [String]) || !Match.test(args.companyId, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: UsersMethods) {
    console.log('usersIsInRoles runs with ', args.roles, args.companyId, this.userId);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    return Roles.userIsInRole(this.userId, args.roles, args.companyId);
  }
});

export const usersAddTouchPointToRoles = new ValidatedMethod({
  name: 'users.addTouchPointToRoles',
  //mixins: [CallPromiseMixin],
  validate(args: UsersMethods) {
    if (
      !Match.test(args._id, [String]) ||
      !Match.test(args.touchPoint, String) ||
      !Match.test(args.companyId, String)
    ) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: UsersMethods) {
    console.log('usersAddTouchPointToRoles runs with ', args._id, args.touchPoint, args.companyId);
    // CHECK IF USER IS LOGGED IN
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // CHECK IF USER IS AUTHORIZED TO ADD TOUCHPOINT TO ROLE
    if (
      !Roles.userIsInRole(this.userId, ['owner', 'companyAdmin'], args.companyId) &&
      !Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)
    ) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to insert a user',
        '[{ "name": "notAuthorized" }]'
      );
    }
    // CHECK WHETHER THIS ROLE IS ALREADY GIVEN TO USERS, IF YES THEN REMOVE
    const usersWithTouchPointRole = Roles.getUsersInRole(args.touchPoint, args.companyId);

    if (usersWithTouchPointRole) {
      Roles.removeUsersFromRoles(usersWithTouchPointRole, [args.touchPoint], args.companyId);
    }
    Roles.addUsersToRoles(args._id, args.touchPoint, args.companyId);
  }
});

export const usersRemoveTouchPointFromRoles = new ValidatedMethod({
  name: 'users.removeTouchPointFromRoles',
  validate(args: UsersMethods) {
    if (
      !Match.test(args._id, [String]) ||
      !Match.test(args.touchPoint, String) ||
      !Match.test(args.companyId, String)
    ) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: UsersMethods) {
    console.log('usersRemoveTouchPointFromRoles runs with ', args._id, args.touchPoint, args.companyId);
    // CHECK IF USER IS LOGGED IN
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // CHECK IF USER IS AUTHORIZED TO ADD TOUCHPOINT TO ROLE
    if (
      !Roles.userIsInRole(this.userId, ['owner', 'companyAdmin'], args.companyId) &&
      !Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)
    ) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to remove touch point from roles',
        '[{ "name": "notAuthorized" }]'
      );
    }
    Roles.removeUsersFromRoles(args._id, [args.touchPoint], args.companyId);
  }
});

export const usersRemoveRoles = new ValidatedMethod({
  name: 'users.removeRoles',
  validate(args: UsersMethods) {
    if (
      !Match.test(args._id, [String]) ||
      !Match.test(args.touchPoint, String) ||
      !Match.test(args.companyId, String)
    ) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: UsersMethods) {
    console.log('usersRemoveRoles runs with ', args._id, args.roles, args.companyId);
    const rolesAreForContributor = args.roles.reduce((result: boolean, role: string) => {
      if ([...TOUCHPOINTSNAMES, 'dates', 'input', 'costs', 'invited'].indexOf(role) === -1 || result === false) {
        result = false;
      }
      return result;
    }, true);
    // CHECK IF USER IS LOGGED IN
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // ONLY ADMIN, OWNER and CANDIDATE OWNER CAN CHANGE DATES, INPUT, COSTS, INVITED,TOUCHPOINTS ROLES
    if (rolesAreForContributor) {
      if (
        !Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP) &&
        !Roles.userIsInRole(this.userId, 'owner', args.companyId) &&
        !Roles.userIsInRole(this.userId, 'companyAdmin', args.companyId)
      ) {
        throw new Meteor.Error(
          'users.general.notAuthorized',
          'User is not authorized to remove contributor roles',
          '[{ "name": "notAuthorized" }]'
        );
      }
    } else {
      throw new Meteor.Error(
        'users.general.notAuthorized',
        'Roles are not just contributor roles',
        '[{ "name": "notAuthorized" }]'
      );
    }
    // ONLY ADMIN AND USER SELF CAN CHANGE EMPLOYEE ROLE
    if (args.roles.indexOf('employee') !== -1) {
      if (!Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP) && args._id !== this.userId) {
        throw new Meteor.Error(
          'users.general.notAuthorized',
          'User is not authorized to change employee role',
          '[{ "name": "notAuthorized" }]'
        );
      }
    }
    // ONLY ADMIN CAN CHANGE OWNER ROLE
    if (args.roles.indexOf('owner') !== -1) {
      if (!Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)) {
        throw new Meteor.Error(
          'users.general.notAuthorized',
          'User is not authorized to change owner / candidate owner roles',
          '[{ "name": "notAuthorized" }]'
        );
      }
    }
    // ONLY ADMIN AND OWNER CAN CHANGE CANDIDATE OWNER ROLE
    if (args.roles.indexOf('companyAdmin') !== -1) {
      if (
        !Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP) &&
        !Roles.userIsInRole(this.userId, 'owner', args.companyId)
      ) {
        throw new Meteor.Error(
          'users.general.notAuthorized',
          'User is not authorized to change owner / candidate owner roles',
          '[{ "name": "notAuthorized" }]'
        );
      }
    }
    Roles.removeUsersFromRoles(args._id, args.roles, args.companyId);
  }
});

export const usersAddRoles = new ValidatedMethod({
  name: 'users.addRoles',
  //mixins: [CallPromiseMixin],
  validate(args: UsersMethods) {
    if (
      !Match.test(args._id, [String]) ||
      !Match.test(args.touchPoint, String) ||
      !Match.test(args.companyId, String)
    ) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: UsersMethods) {
    console.log('usersAddRoles runs with ', args._id, args.roles, args.companyId);
    // CHECK IF USER IS LOGGED IN
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // CHECK IF USER IS AUTHORIZED TO ADD ROLES
    if (args.roles.indexOf('owner') !== -1) {
      if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
        throw new Meteor.Error(
          'users.general.notAuthorized',
          'User is not authorized to add roles for users',
          '[{ "name": "notAuthorized" }]'
        );
      }
    }
    if (args.roles.indexOf('companyAdmin') !== -1) {
      if (
        !Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP) &&
        !Roles.userIsInRole(this.userId, 'owner', args.companyId)
      ) {
        throw new Meteor.Error(
          'users.general.notAuthorized',
          'User is not authorized to add roles for users',
          '[{ "name": "notAuthorized" }]'
        );
      }
    }
    // MAKE SURE USER IS NOT AN EMPLOYEE OF MORE THAN ONE COMPANY
    if (args.roles.indexOf('employee') !== -1) {
      const companyIds = Roles.getGroupsForUser(this.userId, 'employee');
      console.log('companyIds in users.addRoles method :', companyIds);
      companyIds.forEach((companyId) => {
        Roles.removeUsersFromRoles([this.userId], ['employee'], companyId);
      });
    }
    // ONLY 'DATES', 'INPUT', 'COST', EMPLOYEE' AND 'INVITED' ARE ROLES THAT CAN BE ASSIGNED TO MORE THAN ONE USER
    // MAKE SURE NO ONE ELSE IS OWNER
    if (args.roles.indexOf('owner') !== -1) {
      const owners = Roles.getUsersInRole('owner', args.companyId).fetch();
      console.log('owners :', owners);
      Roles.removeUsersFromRoles(owners, ['owner'], args.companyId);
    }
    // MAKE SURE NO ONE ELSE IS CANDIDATE OWNER
    if (args.roles.indexOf('companyAdmin') !== -1) {
      const companyAdmins = Roles.getUsersInRole('companyAdmin', args.companyId).fetch();
      console.log('companyAdmins :', companyAdmins);
      Roles.removeUsersFromRoles(companyAdmins, ['companyAdmin'], args.companyId);
    }
    // ANY MAJOR ROLE IMPLIES ADDITION OF MINOR ROLES IF COSTS, THEN ALSO INPUT AND DATES. IF INPUT, THEN ALSO DATES
    if (args.roles.indexOf('input') !== -1) {
      args.roles.push('dates');
    }
    if (args.roles.indexOf('costs') !== -1) {
      args.roles.push('dates', 'input');
    }
    if (args.roles.indexOf('owner') !== -1 || args.roles.indexOf('companyAdmin') !== -1) {
      args.roles.push('dates', 'input', 'costs');
    }

    // MAKE SURE NO ONE ELSE IS ALLOWED TO CHANGE TOUCH POINT
    for (const role in args.roles) {
      if (TOUCHPOINTSNAMES.indexOf(role) !== -1) {
        const contributors = Roles.getUsersInRole(role, args.companyId).fetch();
        console.log('contributors :', contributors);
        Roles.removeUsersFromRoles(contributors, [role], args.companyId);
      }

      // DEDOUBLE THROUGH SET
      const uniqueRoles = Array.from(new Set(args.roles));
      console.log('usersAddRoles implements uniqueRoles ', uniqueRoles);

      // REMOVE CONTRIBUTOR AND EMPLOYEE ROLES TO PREVENT ROLES STICKING TO USER
      //Roles.removeUsersFromRoles(userId, [...COMPANY_CONTRIBUTOR_ROLES, ...COMPANY_EMPLOYEE_ROLES, ...COMPANY_OWNER_ROLES], companyId);

      // ADD ROLES
      Roles.addUsersToRoles(args._id, uniqueRoles, args.companyId);
    }
  }
});

export const usersDownPermission = new ValidatedMethod({
  name: 'users.downPermission',
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.userId, String) || !Match.test(args.companyId, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('usersDownPermission runs with ', args.userId, args.companyId);
    // CHECK IF USER IS LOGGED IN
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (
      !Roles.userIsInRole(this.userId, ['owner', 'companyAdmin'], args.companyId) &&
      !Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)
    ) {
      throw new Meteor.Error(
        'users.general.notAuthorized',
        'User is not authorized to down permissions for users',
        '[{ "name": "notAuthorized" }]'
      );
    }
    if (
      Roles.userIsInRole(args.userId, 'dates', args.companyId) &&
      Roles.userIsInRole(args.userId, 'input', args.companyId) &&
      Roles.userIsInRole(args.userId, 'costs', args.companyId)
    ) {
      Roles.removeUsersFromRoles(args.userId, ['costs'], args.companyId);
    } else if (
      Roles.userIsInRole(args.userId, 'dates', args.companyId) &&
      Roles.userIsInRole(args.userId, 'input', args.companyId) &&
      !Roles.userIsInRole(args.userId, 'costs', args.companyId)
    ) {
      Roles.removeUsersFromRoles(args.userId, ['input'], args.companyId);
    }
  }
});

export const usersDoubleDownPermission = new ValidatedMethod({
  name: 'users.doubleDownPermission',
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.userId, String) || !Match.test(args.companyId, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('usersDoubleDownPermission runs with ', args.userId, args.companyId);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (
      !Roles.userIsInRole(this.userId, ['owner', 'companyAdmin'], args.companyId) &&
      !Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)
    ) {
      throw new Meteor.Error(
        'users.general.notAuthorized',
        'User is not authorized to double down permissions for users',
        '[{ "name": "notAuthorized" }]'
      );
    }
    if (
      Roles.userIsInRole(args.userId, 'dates', args.companyId) &&
      Roles.userIsInRole(args.userId, 'input', args.companyId) &&
      Roles.userIsInRole(args.userId, 'costs', args.companyId)
    ) {
      Roles.removeUsersFromRoles(args.userId, ['input', 'costs'], args.companyId);
    }
  }
});

export const usersUpPermission = new ValidatedMethod({
  name: 'users.upPermission',
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.userId, String) || !Match.test(args.companyId, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('usersUpPermission runs with ', args.userId, args.companyId, 'this.userId', this.userId);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (
      !Roles.userIsInRole(this.userId, ['owner', 'companyAdmin'], args.companyId) &&
      !Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)
    ) {
      throw new Meteor.Error(
        'users.general.notAuthorized',
        'User is not authorized to up permissions for users',
        '[{ "name": "notAuthorized" }]'
      );
    }
    if (
      Roles.userIsInRole(args.userId, 'dates', args.companyId) &&
      !Roles.userIsInRole(args.userId, 'input', args.companyId) &&
      !Roles.userIsInRole(args.userId, 'costs', args.companyId)
    ) {
      Roles.addUsersToRoles(args.userId, 'input', args.companyId);
    } else if (
      Roles.userIsInRole(args.userId, 'dates', args.companyId) &&
      Roles.userIsInRole(args.userId, 'input', args.companyId) &&
      !Roles.userIsInRole(args.userId, 'costs', args.companyId)
    ) {
      Roles.addUsersToRoles(args.userId, 'costs', args.companyId);
    }
  }
});

export const usersDoubleUpPermission = new ValidatedMethod({
  name: 'users.doubleUpPermission',
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.userId, String) || !Match.test(args.companyId, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('usersDoubleUpPermission runs with ', args.userId, args.companyId);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (
      !Roles.userIsInRole(this.userId, ['owner', 'companyAdmin'], args.companyId) &&
      !Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)
    ) {
      throw new Meteor.Error(
        'users.general.notAuthorized',
        'User is not authorized to double up permissions for users',
        '[{ "name": "notAuthorized" }]'
      );
    }
    if (
      Roles.userIsInRole(args.userId, 'dates', args.companyId) &&
      !Roles.userIsInRole(args.userId, 'input', args.companyId) &&
      !Roles.userIsInRole(args.userId, 'costs', args.companyId)
    ) {
      Roles.addUsersToRoles(args.userId, ['input', 'costs'], args.companyId);
    }
  }
});

export const usersRemoveContributor = new ValidatedMethod({
  name: 'users.removeContributor',
  validate(args: {[key: string]: string}) {
    if (!Match.test(args.userId, String) || !Match.test(args.companyId, String)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(this: Meteor.MethodThisType, args: {[key: string]: string}) {
    console.log('usersRemoveContributor runs with ', args.userId, args.companyId);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (
      !Roles.userIsInRole(this.userId, ['owner', 'companyAdmin'], args.companyId) &&
      !Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)
    ) {
      throw new Meteor.Error(
        'users.general.notAuthorized',
        'User is not authorized to remove contributors',
        '[{ "name": "notAuthorized" }]'
      );
    } else {
      const contributorRoles = [...TOUCHPOINTSNAMES, 'dates', 'input', 'costs'];
      Roles.removeUsersFromRoles(args.userId, contributorRoles, args.companyId);
    }
  }
});

// METEOR METHODS
// 4. VERIFICATION
Meteor.methods({
  'users.sendVerificationLink': function () {
    console.log('server: (resend verification email)');
    if (!this.userId) {
      throw new Meteor.Error(
        'Not logged in',
        'Not logged in for sending verification link',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (Meteor.isServer) {
      Accounts.sendVerificationEmail(this.userId);
    }
  }
});
