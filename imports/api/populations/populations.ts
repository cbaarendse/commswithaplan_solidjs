// ====== IMPORTS ===============================
import {Mongo} from 'meteor/mongo';
import {Match} from 'meteor/check';
import {Meteor} from 'meteor/meteor';

// ====== POPULATIONS == DEFINITIONS ============
const Populations = new Mongo.Collection('populations');

Populations.allow({
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

Populations.deny({
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

// type

const languageItemPattern = {displayName: String, description: Match.Maybe(String)};

// schema pattern
export const probabilityPattern = Match.ObjectIncluding({
  _id: Match.OneOf(String, Object),
  respondentId: Number,
  market: String,
  age_group: Match.OneOf(0, 1, 2, 3, 4, 5),
  age: Number,
  gender: Match.OneOf('m', 'f', 'x')
});

// ====== EXPORTS ===============================
export default Populations;
