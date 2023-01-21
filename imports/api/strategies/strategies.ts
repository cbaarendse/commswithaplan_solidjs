// imports
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {MARKETS} from '../../both/constants';

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

// type
interface TouchPointInPlan {
  name:
    | 'advocacy'
    | 'ambassador'
    | 'app'
    | 'asset'
    | 'cinema'
    | 'console_game'
    | 'direct_mail'
    | 'display'
    | 'door_drop'
    | 'internal_employee'
    | 'event'
    | 'experiential'
    | 'e_mail'
    | 'loyalty_crm'
    | 'magazines'
    | 'mobile'
    | 'newspapers'
    | 'outdoor'
    | 'packaging'
    | 'pr'
    | 'promotion'
    | 'shopper'
    | 'radio'
    | 'sem'
    | 'seo'
    | 'social'
    | 'sponsorship'
    | 'trade_fair'
    | 'television'
    | 'video_on_demand'
    | 'viral'
    | 'website'
    | 'word_of_mouth';
  inputType: 'contacts' | 'grps' | 'impressions' | 'reach';
  value: number;
  show: boolean;
}
export interface Strategy {
  _id: string | {[key: string]: string};
  title: string;
  marketData: boolean;
  market: 'nl' | 'gb' | 'uk' | 'en' | 'be';
  user: string;
  createdAt: Date;
  lastChanged: Date;
  locus: number;
  reach: number;
  // Only required when marketData (population & probabilities) available (optional: true)
  ageStart: number;
  ageEnd: number;
  female: boolean;
  male: boolean;
  peopleInAgeRange: number;
  respondentsCount: number;
  reachedNonUnique: number;
  reachedUnique: number;
  touchPoints: TouchPointInPlan[];
  // Not required (optional: true)
  companyId: string | {[key: string]: string};
  brandId: string | {[key: string]: string};
  productId: string | {[key: string]: string};
}

// schema
const strategiesSchema = {
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
  touchPoints: {type: Array},
  // Not required (optional: true)
  companyId: {type: String, regEx: String, optional: true},
  brandId: {type: String, regEx: String, optional: true},
  productId: {type: String, regEx: String, optional: true}
};

// ====== EXPORTS ===============================
export default Strategies;
