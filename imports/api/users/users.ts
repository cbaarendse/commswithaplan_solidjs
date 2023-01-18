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

// type
export interface UserProfile {
  firstname?: string;
  surname?: string;
  phone?: number;
  street?: string;
  zipcode?: string;
  city?: string;
  companyId?: string;
  lastLanguage?: string;
  lastCompanyId?: string;
  lastBrandId?: string;
  lastProductId?: string;
  lastStrategyId?: string;
  lastCampaignDataType?: string;
  lastRoute?: string;
  stripeId?: string;
  roles?: {[key: string]: [string]};
  heartbeat?: Date;
}

export interface CWAPUser extends Meteor.User {
  profile?: UserProfile;
}

export interface UsersMethods {
  _id: string;
  modifier: Omit<Meteor.User, 'profile'> & {profile: UserProfile};
  touchPoint: string;
}

export const usernameRegExp = /^[A-Za-z0-9]{7,14}$/;
export const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegExp = /^(?=.{0,}[A-Za-z])(?=.{0,}[0-9])[A-Za-z0-9]{6,8}$/;
