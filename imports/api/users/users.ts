// imports
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import {Mongo} from 'meteor/mongo';

// definitions

Meteor.users.allow({
  insert() {
    return false;
  },
  update() {
    return true;
  },
  remove() {
    return false;
  }
});

Meteor.users.deny({
  insert() {
    return true;
  },
  update() {
    return false;
  },
  remove() {
    return true;
  }
});

// Regex
export const usernameRegExp = /^[A-Za-z0-9]{7,14}$/;
export const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegExp = /^(?=.{0,}[A-Za-z])(?=.{0,}[0-9])[A-Za-z0-9]{6,8}$/;
