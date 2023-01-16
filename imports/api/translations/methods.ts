// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {Roles} from 'meteor/alanning:roles';
import {Match} from 'meteor/check';

import Translations from './translations';
import {Translation} from '/imports/ui/types/types';
import {translationPattern} from './translations';

export const translationsInsert = new ValidatedMethod({
  name: 'translations.insert',
  validate(args: {[key: string]: Translation}): void {
    if (!Match.test(args, translationPattern)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(args: {[key: string]: Translation}) {
    console.log('translations insert runs with ', args.doc);
    if (!this.userId) {
      throw new Meteor.Error(
        'Not logged in',
        'Not logged in for sending verification link',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (!Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(
        'users.general.notAuthorized',
        'User is not authorized to insert a translation',
        '[{ "name": "notAuthorized" }]'
      );
    }
    Translations.insert(args.doc);
  }
});

export const translationsUpdate = new ValidatedMethod({
  name: 'translations.update',
  validate(args: {[key: string]: string | Translation}): void {
    if (!Match.test(args, {_id: String, modifier: translationPattern})) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(args: {[key: string]: string | Translation}) {
    console.log('translations update runs with ', args._id, args.modifier);
    if (!this.userId) {
      throw new Meteor.Error(
        'Not logged in',
        'Not logged in for sending verification link',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (!Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(
        'users.general.notAuthorized',
        'User is not authorized to insert a translation',
        '[{ "name": "notAuthorized" }]'
      );
    }
    Translations.update({_id: args._id}, {modifier: args.modifier});
  }
});

export const translationsRemove = new ValidatedMethod({
  name: 'translations.remove',
  validate(args: {[key: string]: string}): void {
    if (!Match.test(args, {_id: String})) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(args: {[key: string]: string}) {
    console.log('translations remove runs with ', args._id);
    if (!this.userId) {
      throw new Meteor.Error(
        'Not logged in',
        'Not logged in for sending verification link',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (!Roles.userIsInRole(this.userId, 'admin', Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(
        'users.general.notAuthorized',
        'User is not authorized to insert a translation',
        '[{ "name": "notAuthorized" }]'
      );
    }
    Translations.remove({_id: args._id});
  }
});
