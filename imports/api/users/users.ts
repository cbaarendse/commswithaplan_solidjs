// imports
import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import {Mongo} from 'meteor/mongo';

// definitions
const Users: Mongo.Collection<ReachAppUser> = Meteor.users;

Users.allow({
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

Users.deny({
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
export type Settings = {
  lastLanguage?: string;
  lastCompanyId?: string;
  lastBrandId?: string;
  lastProductId?: string;
  lastStrategyId?: string;
  lastCampaignDataType?: string;
  lastRoute?: string;
};

type Profile = Settings & {
  firstname?: string;
  surname?: string;
  phone?: number;
  street?: string;
  zipcode?: string;
  city?: string;
  companyId?: string;
};

export type ReachAppUser = Meteor.User & {
  profile?: Profile;
  stripeId?: string;
  roles?: {[key: string]: [string]};
  heartbeat?: Date;
};

export interface UsersMethods {
  _id: string;
  companyId: string;
  roles: string[];
  modifier: ReachAppUser;
  touchPoint: string;
}

export const usernameRegExp = /^[A-Za-z0-9]{7,14}$/;
export const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegExp = /^(?=.{0,}[A-Za-z])(?=.{0,}[0-9])[A-Za-z0-9]{6,8}$/;

export default Users;
