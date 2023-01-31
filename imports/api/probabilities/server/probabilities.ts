// imports
import {Mongo} from 'meteor/mongo';
import {Match} from 'meteor/check';

// definitions
const Probabilities = new Mongo.Collection('probabilities');

Probabilities.allow({
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

Probabilities.deny({
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

// schema pattern
export const probabilityPattern = {
  _id: Object,
  market: String,
  advocacy: Number,
  ambassador: Number,
  app: Number,
  asset: Number,
  cinema: Number,
  console_game: Number,
  direct_mail: Number,
  display: Number,
  door_drop: Number,
  internal_employee: Number,
  event: Number,
  experiential: Number,
  e_mail: Number,
  loyalty_crm: Number,
  magazines: Number,
  mobile: Number,
  newspapers: Number,
  outdoor: Number,
  packaging: Number,
  pr: Number,
  promotion: Number,
  shopper: Number,
  radio: Number,
  sem: Number,
  seo: Number,
  social: Number,
  sponsorship: Number,
  trade_fair: Number,
  television: Number,
  video_on_demand: Number,
  viral: Number,
  website: Number,
  word_of_mouth: Number
};
// ====== EXPORTS ===============================
export default Probabilities;
