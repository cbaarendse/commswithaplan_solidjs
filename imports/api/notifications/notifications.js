// ====== IMPORTS ===============================
import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import {Language} from '../../both/typings/types';

// ====== NOTIFICATIONS == DEFINITIONS ==========
const Notifications = new Mongo.Collection('notifications');

Notifications.allow({
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

Notifications.deny({
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
export interface Notification {
  name: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'personal';
  language: Language;
  title: string;
  message: string;
}

// schema
const notificationsSchema = {
  name: {type: String, label: 'Name', max: 50},
  type: {
    type: String,
    label: 'Type',
    allowedValues: ['info', 'success', 'warning', 'error', 'personal']
  },
  language: {type: String},
  title: {type: String, label: 'Title', max: 50},
  message: {type: String, label: 'Message', max: 100}
};

// exports
export default Notifications;
