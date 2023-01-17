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
export type Probability = {
  _id: Mongo.ObjectID;
  market: string;
} & {
  [key: string]: number;
};

const languageItemPattern = {displayName: String, description: Match.Maybe(String)};

// schema pattern
export const probabilityPattern = {
  _id: Object,
  market: String,
  english: languageItemPattern,
  dutch: languageItemPattern
};

// ====== EXPORTS ===============================
export default Populations;
