// ====== IMPORTS ===============================
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import Translations from '../../api/translations/translations';
import Strategies from '../../api/strategies/strategies';
import Brands from '../../api/brands/brands';
import Products from '../../api/products/products';

import {PROBABILITIES_CODING} from '../../startup/both/constants';

import './StrategyHeader.html';

// ======= TEMPLATE == HELPERS ==================
Template.strategy_header.helpers({
  strategy() {
    if (Session.equals('strategyId', null)) {
      const randomStrategyId = Strategies.findOne({})._id;
      Session.set('strategyId', randomStrategyId);
    }
    return Strategies.findOne({_id: Session.get('strategyId')});
  },
  startAge() {
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    const ages = PROBABILITIES_CODING[Session.get('market')].ages;
    const index = strategy.ageStart;
    return ages[index].start;
  },
  endAge() {
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    const ages = PROBABILITIES_CODING[Session.get('market')].ages;
    const index = strategy.ageEnd;
    return ages[index].end;
  },
  brandName(brandId) {
    const brand = Brands.findOne({_id: brandId});
    return brand.name;
  },
  productName(productId) {
    const product = Products.findOne({_id: productId});
    return product.name;
  },
  strategyTitle(thisTitle) {
    const titleInParts = thisTitle.split(' ');
    if (
      titleInParts.length === 2 &&
      titleInParts[0] === 'new_strategy' &&
      typeof parseInt(titleInParts[1]) === 'number' &&
      !isNaN(parseInt(titleInParts[1]))
    ) {
      return (
        Translations.findOne({name: titleInParts[0]})[Session.get('language')].displayName +
        ' ' +
        parseInt(titleInParts[1]).toString()
      );
    } else {
      return thisTitle;
    }
  },
  selected(option) {
    return this.market === option ? 'selected' : '';
  },
  calculating() {
    return Session.get('calculating');
  }
});

// ======= TEMPLATE == EVENTS ===================
Template.strategy_header.events({
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
