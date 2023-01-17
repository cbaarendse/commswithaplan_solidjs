// ====== IMPORTS ===============================
import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

//= ===== TOUCHPOINTS == DEFINITIONS =============
const TouchPoints = new Mongo.Collection('touchpoints');

TouchPoints.allow({
  insert() {
    return false;
  },
  update() {
    return false;
  },
  remove() {
    return false;
  }
});

TouchPoints.deny({
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

// ====== TOUCHPOINTS == SCHEMA ==================
TouchPoints.schema = new SimpleSchema({
  // Required (optional: false)
  name: {type: String, label: 'touchPoint', max: 50},
  strategyId: {
    type: String,
    label: 'Strategy ID',
    regEx: SimpleSchema.RegEx.Id
  },
  user: {type: String, label: 'User ID', regEx: SimpleSchema.RegEx.Id},
  selected: {type: Boolean},
  inputType: {
    type: String,
    allowedValues: ['reach', 'grps', 'impressions', 'contacts']
  },
  minValue: {type: Number},
  maxValue: {type: Number},
  input: {type: Number},
  // Only required when marketData (population & probabilities) available (optional: true)
  grps: {type: Number, optional: true},
  reach: {type: Number, max: 100, optional: true},
  ots: {type: Number, optional: true},
  averageProbability: {type: Number, optional: true},
  maxReachedRespondents: {type: Number, optional: true},
  sumOfProbabilities: {type: Number, optional: true}
});

TouchPoints.attachSchema(TouchPoints.schema);

// ====== EXPORTS ===============================
export default TouchPoints;
