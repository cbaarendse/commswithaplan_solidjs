// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

import Strategies from './strategies';

import {Strategy} from '/imports/both/typings/types.js';
import {Mongo} from 'meteor/mongo';

export const strategiesInsert = new ValidatedMethod({
  name: 'strategies.insert',
  validate(args: {[key: string]: Strategy}) {
    if (!Match.test(args.strategy, Object)) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  async run(args: {[key: string]: Strategy}): Promise<string | Mongo.ObjectIDStatic> {
    console.log('strategies insert runs with: ', args.strategy);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    return await Strategies.insert(args.strategy);
  }
});

export const strategiesUpdate = new ValidatedMethod({
  name: 'strategies.update',
  validate(args: {_id: string | Mongo.ObjectIDStatic; modifier: {[key: string]: string}}) {
    if (!Match.test(args._id, Match.OneOf(String, Object)) || !Match.test(args.modifier, Object)) {
      throw new Meteor.Error('strategies.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(args: {_id: string | Mongo.ObjectIDStatic; modifier: {[key: string]: string}}) {
    const strategy = Strategies.findOne(args._id);
    const {userId} = strategy;
    console.log('strategies update runs with: ', args._id, args.modifier);
    // Checks for login and strategy ownership
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (userId != this.userId) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to update this strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }
    Strategies.update({_id: args._id}, args.modifier);
  }
});

export const strategiesRemove = new ValidatedMethod({
  name: 'strategies.remove',
  validate(args: {_id: string | Mongo.ObjectIDStatic}) {
    if (!Match.test(args._id, Match.OneOf(String, Object))) {
      throw new Meteor.Error('general.invalid.input', 'Invalid input', '[{ "name": "invalidInput" }]');
    }
  },
  run(args: {_id: string | Mongo.ObjectIDStatic}) {
    console.log(`strategies remove runs with ${args._id}`);
    const strategy = Strategies.findOne({_id: args._id});
    const {userId} = strategy;
    // Checks for login and strategy ownership
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (this.userId !== userId) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to remove this strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }
    Strategies.remove({_id: args._id});
  }
});
