// imports
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {MARKETS} from '../../both/constants/constants';
import type {DeployedTouchPoint, Market} from '/imports/ui/types/types';

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
  inputType?: 'contacts' | 'grps' | 'impressions' | 'reach';
  value: number;
  show: boolean;
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
  overlap: {type: Number, defaultValue: 0, max: 100},
  totalReach: {type: Number, defaultValue: 0, max: 100},
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
  brand: {type: String, optional: true},
  product: {type: String, optional: true}
};

// ====== EXPORTS ===============================
export default Strategies;
