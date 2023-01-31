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
  import {strategy} from '../../../stores/tools';
  import {probabilitiesCheckForMarket} from '../../../../api/probabilities/server/methods';
  import {Market} from '../../../../both/typings/types';

  // variables
  const reachTool = createReachTool();
  const markets = reachTool.setMarkets();
  let market: Market = markets[1];

  onMount(() => {
    $strategy = reachTool.setNewStrategyWithFormula(market.name);
    $strategy = reachTool.sort($strategy, $language);
  });

  probabilitiesCheckForMarket.call({arg: $strategy.marketName}, (error, result) => {
    if (error) {
      console.log('error i probabilitiesChaeckForMarket', error);
    } else {
      $strategy.marketData = result;
    }
  });

  $: {
    console.log('strategy: ', $strategy);
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
