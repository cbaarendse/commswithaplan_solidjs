// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';

import TouchPoints from './touchpoints';
import Strategies from '../strategies/strategies';

import {initialTouchPointSettings, copyObjectValuesToDocument} from '../../startup/both/functions';

export const touchPointsProcessInput = new ValidatedMethod({
  name: 'touchPoints.processInput',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: {type: String},
    strategyId: {type: String},
    input: {type: Number}
  }).validator(),
  run({_id, strategyId, input}) {
    let touchPoint = TouchPoints.findOne({_id});
    const strategy = Strategies.findOne({_id: strategyId});
    const {user} = strategy;
    touchPoint.input = input;

    const modifier = {$set: {...touchPoint}};
    TouchPoints.update({_id}, modifier);

    // Check for login and strategy ownership
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (this.userId !== user) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to calculate this strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }

    if (this.isSimulation) {
      // Simulation code for the client (optional)
    } else {
      // Functions only on server
      const {
        filterProbabilitiesForStrategy,
        arrangeProbabilitiesForTouchPoints
      } = require('../probabilities/server/functions');
      const {
        touchPointAdaptToNewProbabilities,
        collectReachedRespondentsForTouchPoint,
        calculateReachForTouchPoint,
        calculateOtsForTouchPoint
      } = require('./server/functions');
      // Set up probabilities
      const probabilitiesForStrategy = filterProbabilitiesForStrategy(strategyId);
      const probabilitiesForTouchPoints = arrangeProbabilitiesForTouchPoints(strategyId, probabilitiesForStrategy);
      // Adjust touchPoint
      touchPoint = touchPointAdaptToNewProbabilities(touchPoint, strategy, probabilitiesForTouchPoints);
      // Collect respondents
      const reachedRespondentsForTouchPoint = collectReachedRespondentsForTouchPoint(
        touchPoint,
        probabilitiesForTouchPoints
      );
      console.log('reachedRespondentsForTouchPoint :', reachedRespondentsForTouchPoint);
      // Reach
      touchPoint.reach = calculateReachForTouchPoint(reachedRespondentsForTouchPoint, strategy);
      // OTS
      touchPoint.ots = calculateOtsForTouchPoint(touchPoint);
      // Save
      const modifier = {$set: {...touchPoint}};
      console.log('modifier :', modifier);
      TouchPoints.update({_id}, modifier);
    }
  }
});

export const touchPointsInsert = new ValidatedMethod({
  name: 'touchPoints.insert',
  mixins: [CallPromiseMixin],
  validate: TouchPoints.simpleSchema().validator({clean: true, filter: true}),
  run(touchPointSettings) {
    console.log('touch points insert runs with', touchPointSettings);
    if (!this.userId) {
      throw new Meteor.Error('Not logged in', 'Not logged in for removing touch points', '[{ "name": "notLoggedIn" }]');
    }
    if (this.userId !== touchPointSettings.user) {
      throw new Meteor.Error(
        'Not authorized',
        'Not authorized for inserting touch points for a strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }
    TouchPoints.insert(touchPointSettings);
  }
});

export const touchPointsUpdate = new ValidatedMethod({
  name: 'touchPoints.update',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: {type: String},
    modifier: {type: Object, blackbox: true}
  }).validator({clean: true, filter: true}),
  run({_id, modifier}) {
    console.log('touchPoints update (server) runs with: ', _id, modifier);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    // Check if strategy is from user
    if (modifier.$set.user != this.userId) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to update this strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }
    TouchPoints.update({_id}, modifier);
  }
});

export const touchPointsRemoveAllForStrategy = new ValidatedMethod({
  name: 'touchPoints.removeAllForStrategy',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    strategyId: {type: String}
  }).validator({clean: true, filter: true}),
  run({strategyId}) {
    console.log(`touch points remove runs with ${strategyId}`);
    const strategy = Strategies.findOne({_id: strategyId});
    const {_id, user} = strategy;
    if (!this.userId) {
      throw new Meteor.Error('Not logged in', 'Not logged in for removing touch points', '[{ "name": "notLoggedIn" }]');
    }
    if (this.userId !== user) {
      throw new Meteor.Error(
        'Not authorized',
        'Not authorized for removing touch points from a strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }
    TouchPoints.remove({strategyId: _id});
  }
});

export const touchPointsResetAndSaveForStrategy = new ValidatedMethod({
  name: 'touchPoints.resetAndSaveForStrategy',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: {type: String},
    strategyId: {type: String}
  }).validator(),
  run({_id, strategyId}) {
    console.log('touchPointsResetAndSaveForStrategy runs with :', _id, strategyId);
    let touchPoint = TouchPoints.findOne({_id});
    const {name} = touchPoint;
    const strategy = Strategies.findOne({_id: strategyId});
    const {user, marketData} = strategy;

    if (!this.userId) {
      throw new Meteor.Error(
        'Not logged in',
        'Not logged in for resetting touch points',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (this.userId !== user) {
      throw new Meteor.Error(
        'Not authorized',
        'Not authorized for resetting touch points from a strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }

    const resetTouchPoint = initialTouchPointSettings(strategyId, name, marketData);
    touchPoint = copyObjectValuesToDocument(resetTouchPoint, touchPoint);
    const modifier = {$set: {...touchPoint}};
    TouchPoints.update({_id}, modifier);

    return;
  }
});
