// ====== IMPORTS ===============================
import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {$} from 'meteor/jquery';
import {ReactiveVar} from 'meteor/reactive-var';
import {Tracker} from 'meteor/tracker';

import TouchPoints from '../../../api/touchpoints/touchpoints';
import Strategies from '../../../api/strategies/strategies';

import {
  processInputForTouchPoint,
  updateStrategy,
  updateTouchPoint,
  resetTouchPointForStrategy
} from '../strategy/StrategyFunctions';
import {notify} from '../../notifications/NotificationsFunctions';

import './StrategyTouchPoints.html';

// ====== TEMPLATE == ONCREATED == ONRENDERED ===
Template.strategy_touchpoints.onCreated(function() {
  const strategy = Template.currentData();
  const {_id, market, marketData} = strategy;
});

Template.strategy_touchpoint.onCreated(function() {
  const instance = this;
  // Set vars to be used later
  instance.sliding = new ReactiveVar(false);
  instance.slidingInput = new ReactiveVar(null);
});

Template.strategy_touchpoint.onRendered(async function() {
  // Circumstances (like data) might have been changed, so for each touchpoint calculate and store reach and ots
  const strategy = Strategies.findOne({_id: Session.get('strategyId')});
  const strategyId = Session.get('strategyId');
  const {marketData} = strategy;
  const touchPoint = Template.currentData();
  const {_id} = touchPoint;
  if (marketData && touchPoint.input > 0) {
    await processInputForTouchPoint(_id, strategyId, touchPoint.input);
  }
});

// ======= TEMPLATE == HELPERS ==================
Template.strategy_touchpoints.helpers({
  touchPoints() {
    const sortOrder = {};
    sortOrder[Session.get('sortVariable')] = Session.get('sortOrder');
    return TouchPoints.find({strategyId: Session.get('strategyId')}, {sort: sortOrder});
  }
});

Template.strategy_touchpoint.helpers({
  maxStrategies() {
    if (Strategies.find({author: Meteor.userId()}).count() >= 20) {
      return true;
    }
    return false;
  },
  hidden() {
    return !this.selected && Session.equals('hideUnSelected', true) ? 'hidden' : '';
  },
  checked() {
    return this.selected ? 'checked' : '';
  },
  updating() {
    return Session.equals('updating', this._id);
  },
  sliding() {
    return Template.instance().sliding.get();
  },
  slidingInput() {
    return Template.instance().slidingInput.get();
  },
  thisInputTypeIsReach() {
    return this.inputType === 'reach';
  },
  stepByType() {
    return this.inputType === 'reach' ? 5 : this.maxValue / 10 || 100000;
  },
  marketData() {
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    return strategy.marketData;
  }
});

// ====== TEMPLATE == EVENTS ====================
Template.strategy_touchpoint.events({
  'change .check': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();

    const touchPoint = this;
    const {_id, selected, strategyId} = touchPoint;
    touchPoint.selected = !selected;
    touchPoint.input = 0;
    touchPoint.reach = 0;
    touchPoint.ots = 0;

    const modifierForTouchPoint = {$set: {...touchPoint}};
    await updateTouchPoint(_id, modifierForTouchPoint);

    const modifierForStrategy = {$set: {lastChanged: new Date()}};
    await updateStrategy(strategyId, modifierForStrategy);

    Session.set('calculateDisabled', false);
    return;
  },

  'click span.display-name': function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    const touchPoint = this;
    const {name} = touchPoint;
    Session.set('selectedTouchPoint', name);
    $('#touchpoint-modal').modal('show');
  },
  // FIXME: also in chrome?
  'input input.touchpoint-slider': function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    // Capture and show temporary input while sliding
    Template.instance().sliding.set(true);
    Template.instance().slidingInput.set(parseInt(event.currentTarget.value));
    return;
  },

  'mouseup input.touchpoint-slider': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    // Reset temporary input that shows while sliding
    Template.instance().sliding.set(false);
    Template.instance().slidingInput.set(null);

    const input = parseInt(event.currentTarget.value);
    const touchPoint = this;
    const {_id, strategyId} = touchPoint;
    const strategy = Strategies.findOne({_id: strategyId});
    const {marketData} = strategy;

    if (input === 0) {
      await resetTouchPointForStrategy(_id, strategyId);
    } else if (!marketData && input > 0) {
      touchPoint.input = input;
      touchPoint.selected = input === 0 ? false : true;
      const modifier = {$set: {...touchPoint}};
      await updateTouchPoint(_id, modifier);
    } else if (marketData && input > 0) {
      await processInputForTouchPoint(_id, strategyId, input);
    }
    strategy.locus = 0;
    strategy.reach = 0;
    strategy.lastChanged = new Date();
    const modifier = {$set: {...strategy}};
    await updateStrategy(strategyId, modifier);

    Session.set('calculateDisabled', false);
    return;
  },

  'click span.input-box': function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event, template, this);
    const touchPoint = this;
    const {_id} = touchPoint;

    Session.set('updating', _id);

    Tracker.afterFlush(function() {
      $('input.touchpoint-input').focus();
    });
    return;
  },

  'focusout input.touchpoint-input': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    console.log('event & this in form :', event, this);
    const touchPoint = this;
    const {_id, strategyId, minValue, maxValue} = touchPoint;
    const strategy = Strategies.findOne({_id: strategyId});

    const {marketData} = strategy;
    if (event.target.value) {
      const preciseInputValue = parseInt(event.target.value);
      if (preciseInputValue < minValue || preciseInputValue > maxValue.toFixed(0)) {
        notify(
          'range',
          'danger',
          'Please respect range',
          `You can not put in less than ${minValue} or more than ${maxValue
            .toFixed(0)
            .toLocaleString()}. Please put in a new amount.`
        );
      } else {
        touchPoint.input = preciseInputValue;
        touchPoint.selected = touchPoint.input > 0 ? true : false;

        if (!marketData) {
          touchPoint.input = preciseInputValue;
        } else if (marketData) {
          await processInputForTouchPoint(_id, strategyId, touchPoint.input);
        }
        strategy.locus = 0;
        strategy.reach = 0;
        strategy.lastChanged = new Date();
        const modifier = {$set: {...strategy}};
        await updateStrategy(strategyId, modifier);
      }
    }

    Session.set('calculateDisabled', false);
    Session.set('updating', null);
    return;
  }
});
