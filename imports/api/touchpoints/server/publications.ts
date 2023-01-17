// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';

import Strategies from '../../strategies/strategies.js';
import TouchPoints from '../touchpoints.js';

Meteor.publish('touchpoints', function() {
  if (!this.userId) {
    return this.ready;
  }
  //Identify all strategyids for current user
  const strategyIdsForUser = Strategies.find({user: this.userId}).map((strategy) => strategy._id);
  // For this user take out touch points that are not connected to a strategyId
  TouchPoints.remove({
    user: this.userId,
    strategyId: {$nin: strategyIdsForUser}
  });

  return TouchPoints.find({user: this.userId});
});
