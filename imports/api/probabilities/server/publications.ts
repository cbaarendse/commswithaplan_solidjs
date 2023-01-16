// imports
import {Meteor} from 'meteor/meteor';

import Probabilities from './probabilities';

// publications
Meteor.publish('probabilities', function (market) {
  return Probabilities.find({market: 'nl'});
});
