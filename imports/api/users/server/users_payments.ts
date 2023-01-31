import {Meteor} from 'meteor/meteor';
import stripePackage from 'stripe';
import {CWAPUser} from '../users';

const stripeSecretKey = Meteor.settings.private.stripe;
const stripe = stripePackage(stripeSecretKey);

// TODO: Check with new Stripe API

Meteor.methods({
  'users.stripeCustomerDetails': async function (): Promise<any> {
    const user: CWAPUser | null | undefined = Meteor.user();
    let stripeId = '';
    if (user != undefined && user.profile?.stripeId != undefined) {
      stripeId = user.profile?.stripeId;
      console.log('user payment details with: ', stripeId);
    }
    let customer;
    try {
      customer = await stripe.customers.retrieve(stripeId);
    } catch (error: any) {
      console.log('payment details error: ', error.message);
      throw new Meteor.Error(error);
    }
    return customer;
  },

  'users.stripeCustomerCard': async function (cardId): Promise<any> {
    const user: CWAPUser | null | undefined = Meteor.user();
    let stripeId: string;
    if (user != undefined && user.profile != undefined && user.profile.stripeId != undefined) {
      stripeId = user.profile.stripeId;
      console.log('user card with: ', stripeId, ' and ', cardId);
    }
    let card;
    try {
      card = await stripe.customers.retrieveCard(stripeId, cardId);
    } catch (error: any) {
      console.log('card error: ', error.message);
      throw new Meteor.Error(error);
    }
    return card;
  },

  'users.createStripeCustomer': async function (tokenId: string) {
    const user: CWAPUser | null | undefined = Meteor.user();
    let userEmail = '';
    if (user != undefined && user.emails != undefined) {
      userEmail = user.emails[0].address;
    }
    const _id: string | undefined | null = Meteor.userId();
    let customer;
    console.log(`create stripe customer with ${userEmail} and ${tokenId}`);
    try {
      customer = await stripe.customers.create({
        email: userEmail,
        source: tokenId
      });
    } catch (error) {
      console.log(`Create customer - error: ${error.message}`);
    }

    await Meteor.users.update({_id}, {$set: {stripeId: customer.id}});
    console.log('new customer stripe:', customer.id, 'usersData', user.stripeId);
  },

  'users.createStripeSubscription': async function (customerPlan: any, _id: string): Promise<any> {
    const user: CWAPUser | null | undefined = Meteor.user();
    let stripeId = '';
    if (user != undefined && user.stripeId != undefined) {
      stripeId = user.stripeId;
      console.log(`create subscription with ${customerPlan}, ${_id} and ${stripeId}`);
    }

    let subscription;
    try {
      subscription = await stripe.subscriptions.create({
        customer: stripeId,
        items: [
          {
            plan: customerPlan
          }
        ],
        metadata: {companyId: _id}
      });
    } catch (error) {
      console.log(`Create customer - error: ${error.message}`);
      throw new Meteor.Error(error);
    }
    return subscription;
  },

  'users.cancelStripeSubscription': async function (subscriptionId: string): Promise<any> {
    const user: CWAPUser | null | undefined = Meteor.user();
    let stripeId = '';
    if (user != undefined && user.stripeId != undefined) {
      stripeId = user.stripeId;
      console.log(`cancel subscription with ${subscriptionId} and ${stripeId}`);
    }
    let subscription;
    try {
      subscription = await stripe.subscriptions.del(subscriptionId);
    } catch (error) {
      console.log(`Cancel subscription - error: ${error.message}`);
      throw new Meteor.Error(error);
    }
    return subscription;
  },

  'users.listAllPlans': async function (): Promise<any[]> {
    console.log(`list all Plans for ReachApp`);
    let plansList: any[];
    try {
      plansList = await stripe.plans.list();
    } catch (error) {
      console.log(`List all plans - error: ${error.message}`);
      throw new Meteor.Error(error);
    }
    return plansList;
  }
});
