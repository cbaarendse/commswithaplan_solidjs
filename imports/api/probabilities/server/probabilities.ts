// ====== IMPORTS ===============================
import {Mongo} from 'meteor/mongo';

// ====== PROBABILITIES == DEFINITIONS ==========
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

// ====== EXPORTS ===============================
export default Probabilities;
