// imports
import {Mongo} from 'meteor/mongo';

// collection
const Strategies = new Mongo.Collection('strategies');

// guards
// strategies are only for user, not to share. so allow crud on client
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

// exports
export default Strategies;
