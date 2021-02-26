// ====== IMPORTS ===============================
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import {sortIcon} from './StrategyFunctions';

import './StrategyTop.html';

// ======= TEMPLATE == HELPERS ==================
Template.strategy_top.helpers({
  sortIconCol1() {
    if (Session.equals('sortVariable', 'name')) {
      return sortIcon();
    }
    return 'hidden';
  },
  sortIconCol2() {
    if (Session.equals('sortVariable', 'input')) {
      return sortIcon();
    }
    return 'hidden';
  }
});

// ======= TEMPLATE == EVENTS ===================
Template.strategy_top.events({
  'click .columnHeader': function(event, template) {
    // TODO: take out sorting on selected
    // Identify header clicked and update session variables sortVariable and sortOrder
    const newSortVariable = event.target.dataset.header;

    if (Session.equals('sortVariable', newSortVariable)) {
      Session.set('sortOrder', -Session.get('sortOrder'));
    }
    // Set sort order, bottom up for text, top down for numbers;
    else {
      Session.set('sortVariable', newSortVariable);
      switch (Session.get('sortVariable')) {
        case 'name':
          Session.set('sortOrder', 1);
          break;
        case 'input':
          Session.set('sortOrder', -1);
          break;
        default:
      }
    }
  }
});
