// ====== IMPORTS ===============================
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {$} from 'meteor/jquery';

import Strategies from '../../../api/strategies/strategies';
import Brands from '../../../api/brands/brands';
import Products from '../../../api/products/products';
import {NotificationsStack} from '../../../startup/client/localcollections';

import {translate, describe} from '../../../startup/both/functions';
import {notify} from '../../../ui/notifications/NotificationsFunctions';

import './StrategiesModal.html';
import '../../components/modals/Modal';
import '../../components/buttons/Buttons';
import {removeTouchPointsForStrategy, removeStrategy, updateStrategy} from './StrategyFunctions';

// ======= TEMPLATE == ONCREATED == ONRENDERED ==

// ======= TEMPLATE == HELPERS ==================
Template.strategies_table.helpers({
  strategies() {
    return Strategies.find({});
  }
});

Template.strategy_table_row.helpers({
  updating() {
    return Session.equals('updating', this._id);
  },
  strategyTitle(thisTitle) {
    const titleInParts = thisTitle.split(' ');
    if (
      titleInParts.length === 2 &&
      titleInParts[0] === 'new_strategy' &&
      typeof parseInt(titleInParts[1]) === 'number' &&
      !isNaN(parseInt(titleInParts[1]))
    ) {
      return translate(titleInParts[0]) + ' ' + parseInt(titleInParts[1]).toString();
    } else {
      return thisTitle;
    }
  },
  brandName(_id) {
    return Brands.findOne({_id}).name;
  },
  productName(_id) {
    return Products.findOne({_id}).name;
  }
});

// ======= STRATEGIES_MODAL == EVENTS ====================
Template.strategy_table_row.events({
  'click a.open-strategy': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    NotificationsStack.remove({});
    Session.set('strategyId', this._id);
    console.log('this in open strategy :', this);
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});

    // SET COMPANY, BRAND, PRODUCT IF EXISTING IN STRATEGY
    if (strategy.companyId) {
      Session.set('companyId', strategy.companyId);
    }
    if (strategy.brandId) {
      Session.set('brandId', strategy.brandId);
    }
    if (strategy.productId) {
      Session.set('productId', strategy.productId);
    }

    // ENABLE CALCULATE BUTTON
    Session.set('calculateDisabled', false);

    $('#strategies-modal').modal('hide');
  },
  'click button.option-edit-button': function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    Session.set('updating', this._id);
  },

  'click button.option-remove-button': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    const strategy = this;
    const {_id} = strategy;
    const response = confirm(`Are you sure you want to delete this strategy: ${_id}?`);
    if (response == true) {
      await removeTouchPointsForStrategy(_id);
      await removeStrategy(_id);

      // If strategy being removed is shown, other strategy will be shown by setting strategyid session variable to null
      if (Session.equals('strategyId', _id)) {
        Session.set('strategyId', null);
      }
      FlowRouter.reload();
    }
  },
  'submit form.update-strategy-form': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    const strategyTitle = event.target.strategyTitle.value;
    const strategy = this;
    const {_id} = strategy;
    const modifier = {
      $set: {
        title: strategyTitle,
        companyId: Session.get('companyId'),
        brandId: Session.get('brandId'),
        productId: Session.get('productId'),
        lastChanged: new Date()
      }
    };
    await updateStrategy(_id, modifier);
    Session.set('updating', null);
  },

  'click button.cancel': function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    Session.set('updating', null);
  }
});
