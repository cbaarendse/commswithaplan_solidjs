// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';

import Populations from '../populations';

// ====== PUBLICATIONS ==========================
Meteor.publish('populations', function(market) {
  return Populations.find({market});
});
