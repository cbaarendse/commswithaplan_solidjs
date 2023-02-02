// imports
import {Meteor} from 'meteor/meteor';
import TouchPoints from '../../touchpoints/touchpoints';

import {hasItem} from '../../startup/both/functions';
import {emailRegExp} from '../../users/users.js';
import { Match } from 'meteor/check';
import Strategies from '../strategies';
import createDataTool from '../../probabilities/datatool';
import Probabilities from '../../probabilities/server/probabilities';
import { DeployedTouchPoint, Probability } from '/imports/both/typings/types';

// variables
const dataTool = createDataTool();


Meteor.methods({
   'strategies.processResultsWithProbabilities': function(args: {[key: string]: string}) {
          if (!Match.test(args.email, String) || !emailRegExp.test(args.email)) {
            throw new Meteor.Error('users.signup.email', 'Invalid email address', '[{ "name": "invalidEmail" }]');
          }
        
          const strategy = Strategies.findOne({_id: args.strategyId});
          const {_id, userId, marketName, respondentsCount} = strategy;
          const probabilities = Probabilities.find({market: marketName}).fetch();
          const touchPointsDeployed: DeployedTouchPoint[] = strategy.deployment;
          let reachedNonUniqueRespondentsForStrategy: any[] = [];
          const reachedRespondentsPerTouchPointDeployed = {};
          const reachedRespondentsByAllTouchPointsForStrategy = [];
      
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
              'You are not authorized to calculate this strategy',
              '[{ "name": "notAuthorized" }]'
            );
          }
      
          if (this.isSimulation) {
            console.log('simulation');
          } else {
            const {
              touchPointAdaptToNewProbabilities,
              collectReachedRespondentsForTouchPoint
            } = require('../touchpoints/server/functions');
      
            // Set up probabilities
            const probabilitiesForStrategy:Probability[]|undefined = dataTool.filterProbabilitiesForStrategy(probabilities, strategy, _id); // OK
            const probabilitiesForTouchPoints = dataTool.arrangeProbabilitiesForTouchPoints(_id, probabilitiesForStrategy, touchPointsDeployed); //OK
            touchPointsDeployed.forEach((touchPoint) => {
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
})