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
  import {marketName, marketData, strategy} from '../../../stores/tools';

  // variables
  const reachTool = createReachTool();

  $strategy = $marketData
    ? reachTool.setNewStrategyWithData($marketName)
    : reachTool.setNewStrategyWithFormula($marketName);
  $strategy = reachTool.sort($strategy, $language);

  $: {
    Meteor.callAsync('probabilities.checkForMarket', {marketName: $marketName})
      .then((result) => {
        $marketData = result;
      })
      .catch((error) => console.log('error in check', error));
  }

  $: {
    if ($marketData) {
      Meteor.callAsync('probabilities.countRespondentsForMarket', {marketName: $marketName})
        .then((result) => ($strategy.respondentsCount = result))
        .catch((error) => console.log('error in count', error));
    }
  }

  $: {
    $strategy = $marketData
      ? reachTool.setNewStrategyWithData($marketName)
      : reachTool.setNewStrategyWithFormula($marketName);
  }

  $: {
    console.log('strategy. marketData: in $: ', $strategy.marketData);
    console.log('strategy in $: ', $strategy);
  }

  // functions
  let languageUnsubscribe: Unsubscriber = language.subscribe(() => {
    $strategy = reachTool.sort($strategy, $language);
    $strategy.sortedByName = true;
  });

  onDestroy(languageUnsubscribe);
</script>

<BreadCrumbs />
<section>
  <div class="container">
    <Controls />
    <Output />
    {#each $strategy.deployment as touchPoint}
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
