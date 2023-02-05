// imports
import {Mongo} from 'meteor/mongo';
import {Match} from 'meteor/check';

// definitions
const Translations = new Mongo.Collection('translations');

Translations.deny({
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

const languageItemPattern = {displayName: String, description: Match.Maybe(String)};

// schema pattern
export const translationPattern = {
  name: String,
  route: Match.Maybe(String),
  english: languageItemPattern,
  dutch: languageItemPattern
};

// exports
export default Translations;
