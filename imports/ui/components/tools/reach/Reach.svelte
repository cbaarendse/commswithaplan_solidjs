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
  import {
    marketName,
    defaultStrategyWithFormula,
    defaultStrategyExtensionForData,
    touchPointsDefinitions,
    deployedTouchPoints
  } from '../../../stores/tools';
  import {Strategy, StrategyExtension} from '/imports/both/typings/types';

  // variables
  const reachTool = createReachTool();
  let strategy: Strategy & StrategyExtension;

  // start off with a basic strategy, as if the market has no data
  strategy = reachTool.init($defaultStrategyWithFormula);
  deployedTouchPoints.set(strategy.deployment);

  // first sort, based on selected language
  reachTool.sort($language);

  // if market changes, strategy changes, based on availability marketData
  $: if ($marketName) {
    Meteor.callAsync('probabilities.checkForMarket', {marketName: $marketName})
      .then((result) => {
        if (result === true) {
          reachTool.init(
            {...$defaultStrategyWithFormula, ...$defaultStrategyExtensionForData},
            $marketName,
            $touchPointsDefinitions
          );
          strategy = reachTool.getStrategy();
        }
        if (result === false) {
          reachTool.init($defaultStrategyWithFormula, $marketName, $touchPointsDefinitions);
          strategy = reachTool.getStrategy();
        }
      })
      .catch((error) => console.log('error in check for market', error));
  }

  $: if (strategy.marketData && strategy.useMarketData) {
    Meteor.callAsync('probabilities.countRespondentsForMarket', {marketName: $marketName})
      .then((result) => {
        if (result > 0) {
          let strategy = reachTool.getStrategy();
          strategy.respondentsCount = result;
          reachTool.setStrategy(strategy);
        }
      })
      .catch((error) => console.log('error in count', error));
  }

  $: console.log('marketName: in $: ', $marketName);
  $: console.log('reachTool.getStrategy() in $: ', reachTool.getStrategy());
  $: console.log('strategy in $: ', strategy);
  $: console.log('strategy.marketData: in $: ', strategy.marketData);

  // functions
  let languageUnsubscribe: Unsubscriber = language.subscribe(() => {
    reachTool.sort($language);
  });

  onDestroy(languageUnsubscribe);
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <Controls />
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
