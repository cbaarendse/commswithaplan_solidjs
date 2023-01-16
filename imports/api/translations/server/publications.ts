// ====== IMPORTS ===============================
import {Meteor} from 'meteor/meteor';

import Translations from '../translations';

// ====== PUBLICATIONS ==========================
Meteor.publish('translations', function () {
  return Translations.find({});
});
