<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import ReachControlsOutput from './ReachControlsOutput.svelte';
  import ReachTouchPoint from './ReachTouchPoint.svelte';
  import {onDestroy} from 'svelte';
  import {Unsubscriber} from 'svelte/store';
  import createReachTool from '../../functions/reach';
  import {language} from '../../stores/utils';
  import {strategy} from '../../stores/tools';
  import {Market} from '../../typings/types';
  // variables
  const reachTool = createReachTool();
  const markets = reachTool.setMarkets();
  let market: Market = markets[1];
  let marketData: boolean = false;

  $strategy = reachTool.setNewStrategy(market.name, marketData);
  $strategy = reachTool.sort($strategy, $language);
  $: {
    console.log('marktNaam: ', market.name);
    console.log('marketData var: ', marketData);
  }
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
    <ReachControlsOutput />
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
