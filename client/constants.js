// ====== IMPORTS ===============================
import {Session} from 'meteor/session';

Session.setDefault('language', 'english');
Session.setDefault('target', '#commsWithAPlan');

export const ui_translations = {
  english: {english: 'English', dutch: 'Engels'},
  dutch: {english: 'Dutch', dutch: 'Nederlands'},
};
