// ====== IMPORTS ===============================
import { Meteor } from 'meteor/meteor';
import Strategies from '../strategies';

Meteor.publish('strategies', function () {
  if (!this.userId) {
    return this.ready;
  }

  return Strategies.find({ user: this.userId });
});
