// imports
import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';

import {TOUCHPOINTSNAMES, COMPANY_CONTRIBUTOR_ROLES, COMPANY_EMPLOYEE_ROLES} from '../../../both/constants';

// PUBLISH USERS
Meteor.publish('userData', function () {
  if (this.userId) {
    return Users.find({_id: this.userId}, {fields: {roles: 1, stripeId: 1}});
  }
  return this.ready();
});

Meteor.publish('userForEnroll', function (token) {
  if (token) {
    return Users.find({'services.password.reset.token': token});
  }
  return this.ready();
});

Meteor.publish('usersForAdmin', function () {
  console.log('usersForAsdmin publication on');

  // if (this.userId) {
  //   if (Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)) {
  console.log('First user in publication: ', Users.findOne());

  return Users.find({});
  //   }
  //   return this.ready();
  // }
});

Meteor.publish('contributorsForOwner', function (companyId: string) {
  const pathForGroup = `roles.${companyId}`;
  const fields: {[key: string]: number} = {};
  const contributorRoles = [...COMPANY_CONTRIBUTOR_ROLES, ...COMPANY_EMPLOYEE_ROLES, ...TOUCHPOINTSNAMES];

  // Set projection for user data that will be published to a company (candidate) owner
  // TODO: 'emails[0].address'?
  fields['emails[0].address'] = 1;
  fields['profile.firstname'] = 1;
  fields['profile.surname'] = 1;
  fields.employer = 1;
  fields[pathForGroup] = 1;

  // Check if the passed company ID exists and if the current user is (candidate) owner
  // Publish all the users that have 1 or more contributor roles for the owner's company
  if (this.userId) {
    if (companyId && Roles.userIsInRole(this.userId, ['owner', 'companyAdmin'], companyId)) {
      return Roles.getUsersInRole(contributorRoles, companyId, {fields});
    }
    return this.ready();
  }
});
