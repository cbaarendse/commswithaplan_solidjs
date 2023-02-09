<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Controls from './Controls.svelte';
  import Output from './Output.svelte';
  import ReachTouchPoint from './TouchPoint.svelte';
  import {onDestroy, onMount} from 'svelte';
  import {Unsubscriber} from 'svelte/store';
  import createReachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {marketName, marketData, useMarketData} from '../../../stores/tools';
  import {AgeGroup, Genders, Strategy, StrategyExtension} from '/imports/both/typings/types';

  // variables
  const reachTool = createReachTool();
  let genders: Genders;
  let ageGroupStart: AgeGroup;
  let ageGroupEnd: AgeGroup;
  let strategy: Strategy & StrategyExtension;

  // start off with a basic strategy, as if the market has no data
  reachTool.setNewStrategyWithFormula($marketName);
  // first sort, based on selected language
  reachTool.sort($language);

  // if market changes, strategy changes, based on availability marketData
  $: if ($marketData && $useMarketData) {
    Meteor.callAsync('probabilities.checkForMarket', {marketName: $marketName})
      .then((result) => {
        if (result === true) {
          reachTool.setNewStrategyWithData($marketName);
          strategy = reachTool.getStrategy();
        }
        if (result === false) {
          reachTool.setNewStrategyWithData($marketName);
          strategy = reachTool.getStrategy();
        }
      })
      .catch((error) => console.log('error in check for market', error));
  }

  $: if ($marketData && $useMarketData) {
    Meteor.callAsync('probabilities.countRespondentsForMarket', {marketName: $marketName})
      .then((result) => {
        let strategy = reachTool.getStrategy();
        strategy.respondentsCount = result;
        strategy.marketName = $marketName;
        strategy.marketData = $marketData;
        strategy.useMarketData = $useMarketData;
        reachTool.setStrategy(strategy);
      })
      .catch((error) => console.log('error in count', error));
  }

  $: if ($marketData) {
    reachTool.setNewStrategyWithData($marketName);
  } else {
    reachTool.setNewStrategyWithFormula($marketName);
  }

  $: if (genders || ageGroupStart || ageGroupEnd) {
    let strategy = reachTool.getStrategy();
    strategy.genders = genders;
    strategy.ageGroupStart = ageGroupStart;
    strategy.ageGroupEnd = ageGroupEnd;
    reachTool.setStrategy(strategy);
  }

  $: console.log('marketName: in $: ', $marketName);
  $: console.log('marketData: in $: ', $marketData);
  $: console.log('reachTool.strategy in $: ', reachTool.getStrategy());

  // functions
  let languageUnsubscribe: Unsubscriber = language.subscribe(() => {
    reachTool.sort($language);
  });

  onDestroy(languageUnsubscribe);
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <Controls {genders} {ageGroupStart} {ageGroupEnd} />
    <Output />
    {#each strategy.deployment as touchPoint}
      <ReachTouchPoint {touchPoint} />
    {/each}
  </div>
</section>

<style>
  .container {
    /* TODO: no flex column */
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 0em auto;
  }
  @media screen and (min-width: 768px) {
    .container {
      width: 80%;
    }
  }
</style>
