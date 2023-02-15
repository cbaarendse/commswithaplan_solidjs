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
    strategy,
    defaultStrategyWithFormula,
    defaultStrategyWithData,
    deployedTouchPointsForFormula,
    deployedTouchPointsForData,
    sortedByName,
    respondentsCount
  } from '../../../stores/reach';
  import {DeployedTouchPoint} from '/imports/both/typings/types';

  // variables
  const reachTool = createReachTool();

  // start off with a basic strategy, as if the market has no data
  strategy.set($defaultStrategyWithFormula);
  strategy.update((value) => {
    value.deployment = $deployedTouchPointsForFormula;
    return value;
  });
  const io: DeployedTouchPoint = $deployedTouchPointsForFormula[0].value.set(89);
  // first sort, based on selected language
  const [sortedDeployedTouchPoints, updatedSortedByName] = reachTool.sort(
    $deployedTouchPoints,
    $sortedByName,
    $language
  );
  deployedTouchPoints.set(sortedDeployedTouchPoints);
  sortedByName.set(updatedSortedByName);

  // if market changes, strategy changes, based on availability marketData
  $: Meteor.callAsync('probabilities.checkForMarket', {marketName: $marketName})
    .then((result) => {
      if (result === true) {
        strategy = reachTool.initWithData($defaultStrategyWithFormula, $defaultStrategyExtensionForData);
      }
      if (result === false) {
        reachTool.init($defaultStrategyWithFormula);
      }
    })
    .catch((error) => console.log('error in check for market', error));

  $: if ($marketData && $useMarketData) {
    Meteor.callAsync('probabilities.countRespondentsForMarket', {marketName: $marketName})
      .then((result) => {
        if (result > 0) {
          respondentsCount.set(result);
        }
      })
      .catch((error) => console.log('error in count', error));
  }

  $: console.log('marketName: in $: ', $marketName);
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
