// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

import SimpleSchema from 'simpl-schema';

import {MARKETS} from '../../startup/both/constants';

//= ====== STRATEGIES == DEFINITIONS ==================
const Strategies = new Mongo.Collection('strategies');

// STRATEGIES ARE ONLY FOR USER, NOT TO SHARE. SO ALLOW CRUD ON CLIENT.
Strategies.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  }
});

Strategies.deny({
  insert() {
    return false;
  },
  remove() {
    return false;
  },
  update() {
    return false;
  }
});

// ======= STRATEGIES == SCHEMA =======================
Strategies.schema = new SimpleSchema({
  // Required (optional: false)
  title: {type: String, defaultValue: 'New strategy', max: 75},
  marketData: {type: Boolean, defaultValue: false},
  market: {type: String, allowedValues: MARKETS},
  user: {
    type: String,
    autoValue() {
      if (this.isSet) {
        return this.value;
      }
      return Meteor.userId();
    }
  },
  createdAt: {type: Date, defaultValue: new Date()},
  lastChanged: {
    type: Date,
    autoValue() {
      return new Date();
    }
  },
  locus: {type: Number, defaultValue: 0, max: 100},
  reach: {type: Number, defaultValue: 0, max: 100},
  // Only required when marketData (population & probabilities) available (optional: true)
  ageStart: {type: Number, optional: true},
  ageEnd: {type: Number, optional: true},
  female: {type: Boolean, optional: true},
  male: {type: Boolean, optional: true},
  peopleInAgeRange: {type: Number, optional: true},
  respondentsCount: {type: Number, defaultValue: 0, optional: true},
  reachedNonUnique: {type: Number, optional: true},
  reachedUnique: {type: Number, optional: true},
  // Not required (optional: true)
  companyId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  brandId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
  productId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
});

Strategies.attachSchema(Strategies.schema);

// ====== EXPORTS ===============================
export default Strategies;
