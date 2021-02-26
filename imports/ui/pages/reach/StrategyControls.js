// ====== IMPORTS ===============================
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';
import {$} from 'meteor/jquery';
import {ReactiveVar} from 'meteor/reactive-var';

import Companies from '../../api/companies/companies';
import Brands from '../../api/brands/brands';
import Products from '../../api/products/products';
import Strategies from '../../api/strategies/strategies';
import TouchPoints from '../../api/touchpoints/touchpoints';
import TouchPointsBasics from '../../api/touchpointsbasics/touchpointsbasics';
import {MARKETS, PROBABILITIES_CODING} from '../../startup/both/constants';

import {initialStrategySettings, initialTouchPointSettings} from '../../startup/both/functions';
import {notify} from '../../ui/notifications/NotificationsFunctions';
import {selectOption} from '../components/forms/select_functions';
import {
  countPeopleForMarket,
  countRespondentsForMarket,
  countPeopleForStrategy,
  countRespondentsForStrategy,
  insertNewStrategyAndGetId,
  makeNewTitleForStrategy,
  updateStrategy,
  resetTouchPointForStrategy,
  processResultsForStrategyWithProbabilities,
  processResultsForStrategyWithAlgorithm,
  insertNewTouchPointAndGetId,
  removeTouchPointsForStrategy,
  processInputForTouchPoint
} from '../content/strategy/StrategyFunctions';

import './StrategyControls.html';
import '../components/forms/select';

// ======= TEMPLATE == ONCREATED == ONRENDERED ==
Template.strategy_controls.onCreated(function() {
  const instance = this;
  instance.markets = new ReactiveVar(
    MARKETS.map((item, index) => {
      return {name: item, _id: index};
    })
  );
  instance.startAges = new ReactiveVar();
  instance.endAges = new ReactiveVar();
});
Template.strategy_controls.onRendered(function() {
  let strategy = Strategies.findOne({
    companyId: Session.get('companyId'),
    brandId: Session.get('brandId'),
    productId: Session.get('productId')
  });
  if (!strategy) {
    strategy = Strategies.findOne({_id: Session.get('strategyId')});
  }
  if (!strategy) {
    strategy = Strategies.findOne({});
  }
  const {_id, companyId, brandId, productId} = strategy;
  Session.set('strategyId', _id);
  Session.set('companyId', companyId);
  Session.set('brandId', brandId);
  Session.set('productId', productId);
  const touchPoint = Template.currentData();
});

// ======= TEMPLATE == HELPERS ==================
Template.strategy_controls.helpers({
  strategy() {
    if (Session.equals('strategyId', null)) {
      const randomStrategyId = Strategies.findOne({})._id;
      Session.set('strategyId', randomStrategyId);
    }
    return Strategies.findOne({_id: Session.get('strategyId')});
  },
  companies() {
    return Companies.find({}).fetch();
  },
  company(_id) {
    return Companies.findOne({_id});
  },
  brands(companyId) {
    return Brands.find({companyId}).fetch();
  },
  brand(_id) {
    return Brands.findOne({_id});
  },
  products(companyId, brandId) {
    return Products.find({companyId, brandId}).fetch();
  },
  product(_id) {
    return Products.findOne({_id});
  },
  markets() {
    return Template.instance().markets.get();
  },
  market(market) {
    // const strategy = Strategies.findOne({_id: strategyId});
    const markets = Template.instance().markets.get();
    return markets.filter((item) => item.name === market)[0];
  },
  startAges() {
    const ages = PROBABILITIES_CODING[Session.get('market')].ages;
    const list = ages.map((item, index) => {
      return {
        name: `${item.start} - ${item.end}`,
        category: item.category,
        _id: index
      };
    });
    Template.instance().startAges.set(list);
    return Template.instance().startAges.get();
  },
  selectedAgeStart(ageStart) {
    const startAges = Template.instance().startAges.get();
    return startAges.filter((item) => item.category === ageStart)[0];
  },
  endAges() {
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    const ages = PROBABILITIES_CODING[Session.get('market')].ages;
    const startCategory = strategy.ageStart;
    const list = ages
      .map((item, index) => {
        return {
          name: `${item.start} - ${item.end}`,
          category: item.category,
          _id: index
        };
      })
      .filter((item) => item.category >= startCategory);
    Template.instance().endAges.set(list);
    return Template.instance().endAges.get();
  },
  selectedAgeEnd(ageEnd) {
    const endAges = Template.instance().endAges.get();
    return endAges.filter((item) => item.category === ageEnd)[0];
  },
  hideUnSelected() {
    return Session.get('hideUnSelected');
  },
  calculateDisabled() {
    return Session.get('calculateDisabled') ? 'disabled' : '';
  },
  calculating() {
    return Session.get('calculating');
  }
});

// ======= CONTROLS == EVENTS ====================
Template.strategy_controls.events({
  'change select.select-company': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();

    // Define variables
    const company = selectOption.call(this, event, template);
    const {_id} = company;
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    const strategyId = strategy._id;
    // Find brand
    const brand = Brands.findOne({companyId: _id});
    const brandId = brand ? brand._id : null;
    // Find product
    const product = Products.findOne({brandId});
    const productId = product ? product._id : null;
    // Update strategy
    strategy.lastChanged = new Date();
    strategy.companyId = _id;
    strategy.brandId = brandId;
    strategy.productId = productId;
    const modifier = {$set: {...strategy}};
    await updateStrategy(strategyId, modifier);
    // Set company, brand, product in Session variables
    Session.set('companyId', _id);
    Session.set('brandId', brandId);
    Session.set('productId', productId);
    template.$('.select-company').blur();
    return;
  },

  'change select.select-brand': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    // Define variables
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    const strategyId = strategy._id;
    // Find brand
    const brand = selectOption.call(this, event, template);
    const {_id} = brand;
    // Find product
    const product = Products.findOne({brandId: _id});
    const productId = product ? product._id : null;
    // Update strategy
    strategy.lastChanged = new Date();
    strategy.brandId = _id;
    strategy.productId = productId;
    const modifier = {$set: {...strategy}};
    await updateStrategy(strategyId, modifier);
    // Set product in Session variables
    Session.set('brandId', _id);
    Session.set('productId', productId);
    template.$('.select-brand').blur();
    return;
  },

  'change select.select-product': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    const strategyId = strategy._id;
    // Find product
    const product = selectOption.call(this, event, template);
    const {_id} = product;
    // Update strategy
    strategy.lastChanged = new Date();
    strategy.productId = _id;
    const modifier = {$set: {...strategy}};
    await updateStrategy(strategyId, modifier);
    // Set product in Session variables
    Session.set('productId', _id);
    template.$('.select-product').blur();
    return;
  },

  'change select.select-market': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    // Define variables
    const market = selectOption.call(this, event, template);
    const {_id, name} = market;
    console.log('market in select market :', market);
    const strategyId = Session.get('strategyId');
    // Check for marketdata
    const peopleCount = await countPeopleForMarket(name);
    const respondentsCount = await countRespondentsForMarket(name);
    const marketData = peopleCount > 0 && respondentsCount > 0 ? true : false;
    const strategy = initialStrategySettings(name, marketData);
    const touchPointNames = TouchPointsBasics.find({}).map((touchPoint) => touchPoint.name);
    // Reset strategy results
    strategy.lastChanged = new Date();
    strategy.reach = 0;
    strategy.locus = 0;
    const modifier = {$set: {...strategy}};
    await updateStrategy(strategyId, modifier);
    // Adapt strategy to market reality if necessary
    if (marketData) {
      strategy.peopleInAgeRange = await countPeopleForStrategy(strategyId);
      strategy.respondentsCount = await countRespondentsForStrategy(strategyId);
      modifier.$set = {...strategy};
      await updateStrategy(strategyId, modifier);
    }
    // Show all touchpoints
    Session.set('hideUnSelected', false);
    // Renew touchpoints
    await removeTouchPointsForStrategy(strategyId);
    for (const touchPointName of touchPointNames) {
      const touchPoint = initialTouchPointSettings(strategyId, touchPointName, marketData);
      await insertNewTouchPointAndGetId(touchPoint);
    }
    //Activate calculate button
    Session.set('calculateDisabled', false);
    template.$('.select-market').blur();
    return;
  },

  'submit form.strategy-controls-gender-form': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    // Define variables
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    const {_id, marketData, female, male} = strategy;
    const touchPointsEmployed = TouchPoints.find({strategyId: _id, input: {$gt: 0}});
    // Reset strategy results
    strategy.lastChanged = new Date();
    strategy.reach = 0;
    strategy.locus = 0;
    // Toggle gender follows order: fm - f - m
    if (female && male) {
      strategy.female = true;
      strategy.male = false;
    } else if (female && !male) {
      strategy.female = false;
      strategy.male = true;
    } else if (!female && male) {
      strategy.female = true;
      strategy.male = true;
    }
    // Update strategy
    const modifier = {$set: {...strategy}};
    await updateStrategy(_id, modifier);
    // Adapt strategy to market reality if necessary
    if (marketData) {
      strategy.peopleInAgeRange = await countPeopleForStrategy(_id);
      modifier.$set = {...strategy};
      await updateStrategy(_id, modifier);
      // Apply new data to touch points in strategy
      touchPointsEmployed.forEach(
        async (touchPoint) => await processInputForTouchPoint(touchPoint._id, _id, touchPoint.input)
      );
    }
    // Activate calculate button
    Session.set('calculateDisabled', false);
    template.find('#toggle-gender').blur();
    return;
  },

  'change select.select-ageStart': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    // Define variables
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    const {_id, ageEnd, marketData} = strategy;
    const touchPointsEmployed = TouchPoints.find({strategyId: _id, input: {$gt: 0}});
    // Reset strategy results
    strategy.lastChanged = new Date();
    strategy.reach = 0;
    strategy.locus = 0;
    // Convert chosen age category into start age
    const startAges = template.startAges.get();
    const selectedIndex = event.currentTarget.selectedIndex;
    strategy.ageStart = startAges[selectedIndex].category;
    // ageEnd is always equal to or greater than ageStart
    if (ageEnd < strategy.ageStart) {
      strategy.ageEnd = strategy.ageStart;
    }
    // Update strategy
    const modifier = {$set: {...strategy}};
    await updateStrategy(_id, modifier);
    // Adapt strategy to market reality if necessary
    if (marketData) {
      strategy.peopleInAgeRange = await countPeopleForStrategy(_id);
      modifier.$set = {...strategy};
      await updateStrategy(_id, modifier);
      touchPointsEmployed.forEach(
        async (touchPoint) => await processInputForTouchPoint(touchPoint._id, _id, touchPoint.input)
      );
    }
    // Activate calculate button
    Session.set('calculateDisabled', false);
    template.$('select.select#ageStart').blur();
    return;
  },

  'change select.select-ageEnd': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    // Define variables
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    const {_id, marketData} = strategy;
    const touchPointsEmployed = TouchPoints.find({strategyId: _id, input: {$gt: 0}});
    // Reset strategy results
    strategy.lastChanged = new Date();
    strategy.reach = 0;
    strategy.locus = 0;
    // Convert chosen age category into end age
    const endAges = template.endAges.get();
    const selectedIndex = event.currentTarget.selectedIndex;
    strategy.ageEnd = endAges[selectedIndex].category;
    // Update strategy
    const modifier = {$set: {...strategy}};
    await updateStrategy(_id, modifier);
    // Adapt strategy to market reality if necessary
    if (marketData) {
      strategy.peopleInAgeRange = await countPeopleForStrategy(_id);
      modifier.$set = {...strategy};
      await updateStrategy(_id, modifier);
      touchPointsEmployed.forEach(
        async (touchPoint) => await processInputForTouchPoint(touchPoint._id, _id, touchPoint.input)
      );
    }
    // Activate calculate button
    Session.set('calculateDisabled', false);
    template.$('select.select#ageStart').blur();
    return;
  },

  'click button#strategy-controls-calculate': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();

    Session.set('calculating', true);
    // TODO: first start spinner at location reach and locus in headers while calculating
    // Define variables
    // TODO: FIrst piece move to onRendered
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    const {_id, market, marketData} = strategy;
    // If marketData availability changed, reset strategy & touchpoints
    const peopleCount = await countPeopleForMarket(market);
    const respondentsCount = await countRespondentsForMarket(market);
    const checkForMarketData = peopleCount > 0 && respondentsCount > 0 ? true : false;
    if (checkForMarketData != marketData) {
      const resetStrategy = initialStrategySettings(market, checkForMarketData);
      const modifier = {$set: {...resetStrategy}};
      await updateStrategy(_id, modifier);
      const touchPointsEmployed = TouchPoints.find({strategyId: _id, input: {$gt: 0}});
      touchPointsEmployed.forEach(async (touchPoint) => {
        const touchPointId = touchPoint._id;
        await resetTouchPointForStrategy(touchPointId, _id);
      });
    }
    // Process results
    if (!marketData) {
      await processResultsForStrategyWithAlgorithm(_id);
    } else if (marketData) {
      await processResultsForStrategyWithProbabilities(_id);
    }

    Session.set('calculating', false);
    // De-activate calculate button
    Session.set('calculateDisabled', true);
    return;
  },

  'click .strategy-reset': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    // Reset  all touchpoints in strategy
    const strategy = Strategies.findOne({_id: Session.get('strategyId')});
    const {_id, marketData} = strategy;
    const touchPointNames = TouchPointsBasics.find({}).map((touchPoint) => touchPoint.name);
    await removeTouchPointsForStrategy(_id);
    for (const name of touchPointNames) {
      const touchPoint = initialTouchPointSettings(_id, name, marketData);
      await insertNewTouchPointAndGetId(touchPoint);
    }
    // Reset strategy results
    strategy.lastChanged = new Date();
    strategy.reach = 0;
    strategy.locus = 0;
    //Update
    const modifier = {$set: {...strategy}};
    await updateStrategy(_id, modifier);
    // Show all touchpoints
    Session.set('hideUnSelected', false);
    // Activate calculate button
    Session.set('calculateDisabled', true);
    template.find('.strategy-reset').blur();
    return;
  },

  'click .toggle-hide': function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    Session.set('hideUnSelected', !Session.get('hideUnSelected'));
    template.find('.toggle-hide').blur();
    return;
  },

  'click button#add-strategy-in-controls': async function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    const touchPointNames = TouchPointsBasics.find({}).map((touchPoint) => touchPoint.name);
    const strategies = Strategies.find({}).fetch();
    const market = Session.get('market');
    // Set value for marketData
    const peopleCount = await countPeopleForMarket(market);
    const respondentsCount = await countRespondentsForMarket(market);
    const marketData = peopleCount > 0 && respondentsCount > 0 ? true : false;
    // Temporary strategy object
    const strategy = initialStrategySettings(market, marketData);
    // Insert strategy object to generate _id
    const newStrategyId = await insertNewStrategyAndGetId(strategy);
    Session.set('strategyId', newStrategyId);
    // Construct new title
    const newTitle = makeNewTitleForStrategy(strategies);
    strategy.title = newTitle ? newTitle : strategy.title;
    // In case there are marketData, count the people in the strategy age range
    if (marketData) {
      strategy.peopleInAgeRange = countPeopleForStrategy(newStrategyId);
    }
    // Update
    const modifier = {$set: {...strategy}};
    await updateStrategy(newStrategyId, modifier);
    // Populate strategy with touchpoints
    for (const name of touchPointNames) {
      const touchPoint = initialTouchPointSettings(newStrategyId, name, marketData);
      await insertNewTouchPointAndGetId(touchPoint);
    }
    // Show all touchpoints
    Session.set('hideUnSelected', false);
    template.find('#add-strategy-in-controls').blur();
    return;
  },

  'click button.open': function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    // Show all touchpoints
    Session.set('hideUnSelected', false);
    $('#strategies-modal').modal('show');
    template.find('.open').blur();
    return;
  }
});
