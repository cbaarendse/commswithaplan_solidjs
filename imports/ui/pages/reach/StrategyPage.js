// ====== IMPORTS ===============================
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import Strategies from '../../api/strategies/strategies';

import './StrategyPage.html';
import '../controls/StrategyControls';
import '../notifications/Notifications';
import '../headers/StrategyHeader';

import '../content/strategy/StrategyTop';
import '../content/strategy/StrategyTouchPoints';
import '../content/strategy/StrategiesModal';

import '../components/modals/TouchPointModal';

// ====== TEMPLATE == ONCREATED == ONRENDERED ===
Template.strategy_page.onCreated(function() {
  const instance = this;
  instance.autorun(() => {
    instance.subscribe('companies');
    instance.subscribe('brands');
    instance.subscribe('products');
    instance.subscribe('populations', Session.get('market'));
    instance.subscribe('strategies');
    instance.subscribe('touchpoints');
    instance.subscribe('touchpointsbasics');
  });
});

// ====== TEMPLATE == HELPERS ===================
Template.strategy_content.helpers({
  strategy() {
    if (Session.equals('strategyId', null)) {
      const randomStrategyId = Strategies.findOne({})._id;
      Session.set('strategyId', randomStrategyId);
    }
    return Strategies.findOne({_id: Session.get('strategyId')});
  }
});
