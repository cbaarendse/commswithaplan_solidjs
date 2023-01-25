<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import ReachControlsOutput from './ReachControlsOutput.svelte';
  import ReachTouchPoint from './ReachTouchPoint.svelte';
  import {onDestroy, onMount} from 'svelte';
  import {Unsubscriber} from 'svelte/store';
  import createReachTool from '../../functions/reachtool';
  import {language} from '../../stores/utils';
  import {markets, strategy} from '../../stores/tools';

  // variables
  const reachTool = createReachTool($markets[0]);
  $strategy = reachTool.setNewStrategy('New Strategy', false);

  onMount(() => ($strategy.deployment = reachTool.sortByName($strategy.deployment, $language)));

  // functions

  let languageUnsubscribe: Unsubscriber = language.subscribe(() => {
    $strategy.deployment = reachTool.sortByName($strategy.deployment, $language);
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
