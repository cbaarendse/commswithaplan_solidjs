// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';

import SimpleSchema from 'simpl-schema';

import Strategies from './strategies.js';
import TouchPoints from '../touchpoints/touchpoints';

import {hasItem} from '../../startup/both/functions';

export const strategiesProcessResultsWithProbabilities = new ValidatedMethod({
  name: 'strategies.processResultsWithProbabilities',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({strategyId: {type: String}}).validator(),
  run({strategyId}) {
    const strategy = Strategies.findOne({_id: strategyId});
    const {_id, user, respondentsCount} = strategy;
    const touchPointsEmployed = TouchPoints.find({strategyId, input: {$gt: 0}}).fetch();
    let reachedNonUniqueRespondentsForStrategy = [];
    const reachedRespondentsPerTouchPointEmployed = {};
    const reachedRespondentsByAllTouchPointsForStrategy = [];

    // Checks for login and strategy ownership
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
    } else {
      const {
        filterProbabilitiesForStrategy,
        arrangeProbabilitiesForTouchPoints
      } = require('../probabilities/server/functions');
      const {
        touchPointAdaptToNewProbabilities,
        collectReachedRespondentsForTouchPoint
      } = require('../touchpoints/server/functions');

      // Set up probabilities
      const probabilitiesForStrategy = filterProbabilitiesForStrategy(_id); // OK
      const probabilitiesForTouchPoints = arrangeProbabilitiesForTouchPoints(_id, probabilitiesForStrategy); //OK
      touchPointsEmployed.forEach((touchPoint) => {
        // Adjust touchPoint
        touchPoint = touchPointAdaptToNewProbabilities(touchPoint, strategy, probabilitiesForTouchPoints);
        console.log('touchPoint in adapt to new probabilities :', touchPoint);
        // Build non-unique respondents

        // Collect respondents
        const reachedRespondentsForTouchPoint = collectReachedRespondentsForTouchPoint(
          touchPoint,
          probabilitiesForTouchPoints
        );
        // For reach calculation
        reachedNonUniqueRespondentsForStrategy = reachedNonUniqueRespondentsForStrategy.concat(
          reachedRespondentsForTouchPoint
        ); // OK (concat is quicker than unshift)
        // For locus calculation
        reachedRespondentsPerTouchPointEmployed[touchPoint.name] = reachedRespondentsForTouchPoint;
      });
      // Unique respondents
      const reachedUniqueRespondentsForStrategy = new Set(reachedNonUniqueRespondentsForStrategy); // OK
      console.log('reachedRespondentsPerTouchPointEmployed :', reachedRespondentsPerTouchPointEmployed);
      // strategy.reach
      strategy.reach = parseFloat((reachedUniqueRespondentsForStrategy.size / respondentsCount) * 100);
      // Unique respondents for all touchpoints
      reachedUniqueRespondentsForStrategy.forEach((respondentId) => {
        const thisRespondentReachedByAllTouchPoints = touchPointsEmployed.reduce((result, touchPoint, index, list) => {
          if (!hasItem(reachedRespondentsPerTouchPointEmployed[touchPoint.name], respondentId)) {
            result = false;
          }
          return result;
        }, true);
        if (thisRespondentReachedByAllTouchPoints) {
          reachedRespondentsByAllTouchPointsForStrategy.push(respondentId);
        }
      });
      // strategy.locus
      strategy.locus = parseFloat((reachedRespondentsByAllTouchPointsForStrategy.length / respondentsCount) * 100);
      // update strategy
      console.log('strategy in process with probabilities :', strategy);
      const modifier = {$set: {...strategy}};
      Strategies.update({_id}, modifier);
    }
  }
});

export const strategiesProcessResultsWithAlgorithm = new ValidatedMethod({
  name: 'strategies.processResultsWithAlgorithm',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({strategyId: {type: String}}).validator(),
  run({strategyId}) {
    const strategy = Strategies.findOne({_id: strategyId});
    const {_id, user} = strategy;
    const reachValues = TouchPoints.find({strategyId: _id})
      .fetch()
      .reduce((values, touchPoint) => {
        if ((touchPoint.inputType = 'reach' && touchPoint.input > 0)) {
          values.push(touchPoint.input);
        }
        return values;
      }, []);

    // Checks for login and strategy ownership
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
    } else {
      const {reachWithAlgorithmForStrategy, locusWithAlgorithmForStrategy} = require('./server/functions');
      strategy.reach = reachWithAlgorithmForStrategy(reachValues);
      strategy.locus = locusWithAlgorithmForStrategy(reachValues);
    }

    strategy.lastChanged = new Date();

    const modifier = {$set: {...strategy}};
    Strategies.update({_id}, modifier);
    return;
  }
});

export const strategiesInsert = new ValidatedMethod({
  name: 'strategies.insert',
  mixins: [CallPromiseMixin],
  validate: Strategies.simpleSchema().validator({clean: true, filter: true}),
  run(strategySettings) {
    console.log('strategies insert runs with: ', strategySettings);
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    return Strategies.insert(strategySettings);
  }
});

export const strategiesUpdate = new ValidatedMethod({
  name: 'strategies.update',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: {type: String},
    modifier: {type: Object, blackbox: true}
  }).validator({clean: true, filter: true}),
  run({_id, modifier}) {
    const strategy = Strategies.findOne({_id});
    const {user} = strategy;
    console.log('strategies update runs with: ', _id, modifier);
    // Checks for login and strategy ownership
    if (!this.userId) {
      throw new Meteor.Error(
        'users.general.notLoggedIn',
        'User is not properly logged in',
        '[{ "name": "notLoggedIn" }]'
      );
    }
    if (user != this.userId) {
      throw new Meteor.Error(
        'Not authorized',
        'You are not authorized to update this strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }
    Strategies.update({_id}, modifier);
  }
});

export const strategiesRemove = new ValidatedMethod({
  name: 'strategies.remove',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({_id: {type: String}}).validator(),
  run({_id}) {
    console.log(`strategies remove runs with ${_id}`);
    const strategy = Strategies.findOne({_id});
    const {user} = strategy;
    // Checks for login and strategy ownership
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
        'You are not authorized to remove this strategy',
        '[{ "name": "notAuthorized" }]'
      );
    }
    Strategies.remove({_id});
  }
});
