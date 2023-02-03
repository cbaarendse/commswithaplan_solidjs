<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Controls from './Controls.svelte';
  import Output from './Output.svelte';
  import ReachTouchPoint from './TouchPoint.svelte';
  import {onDestroy} from 'svelte';
  import {Unsubscriber} from 'svelte/store';
  import createReachTool from '../../../functions/reach';
  import {language} from '../../../stores/utils';
  import {strategy} from '../../../stores/tools';
  import {Market} from '../../../../both/typings/types';

  // variables
  const reachTool = createReachTool();
  const markets = reachTool.setMarkets();
  let market: Market = markets[1];
  // TODO: set new strategy with formula should first check for marketData
  $strategy = reachTool.setNewStrategyWithFormula(market.name);
  $strategy = reachTool.sort($strategy, $language);

  Meteor.callAsync('test', 'Hanno!')
    .then((result: any) => console.log('result in callAsync test', result))
    .catch((error) => console.log('error in callAsync test', error));

  const check = Meteor.callAsync('probabilities.checkForMarket', {marketName: $strategy.marketName});
  check.then((result) => {
    console.log('check result', result);
    $strategy.marketData = result;
  });
  check.catch((error) => console.log('error in check', error));
  console.log('check is: ', check);

  Meteor.callAsync('probabilities.countRespondentsForMarket', {marketName: 'nl'})
    .then((result) => ($strategy.respondentsCount = result))
    .catch((error) => console.log('error in count', error));

  console.log('strategy. marketData log: ', $strategy.marketData);
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
