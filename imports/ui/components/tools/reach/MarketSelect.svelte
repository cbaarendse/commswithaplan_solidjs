<script lang="ts">
  import {faSort} from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa/src/fa.svelte';

  // imports
  import {deployment, marketData, marketName, useMarketData, results} from '../../../stores/reach';
  import {InputType, TouchPointDefinition} from '/imports/both/typings/types';
  import createReachTool from '/imports/ui/functions/reach';

  //variables
  const reachTool = createReachTool();

  // functions
  function reset() {
    deployment.set(reachTool.touchPointsForDeployment(reachTool.touchPointsDefinitions()));
    $marketData && $useMarketData
      ? deployment.update((data) => {
          return data.map((touchPoint) => {
            const defaultInputTypeIndexForThisTouchPoint = reachTool
              .touchPointsDefinitions()
              .filter(
                (definition: TouchPointDefinition) => definition.name == touchPoint.name
              )[0].defaultInputTypeIndex;
            return {...touchPoint, inputTypeIndex: defaultInputTypeIndexForThisTouchPoint};
          });
        })
      : deployment.update((data) => {
          return data.map((touchPoint) => Object.assign(touchPoint, {inputTypeIndex: InputType.Reach}));
        });
  }
</script>

<fieldset>
  <select
    class="market"
    name="market"
    id="market__select"
    bind:value={$marketName}
    on:change={() => {
      $useMarketData = false;
    }}
    on:change={reset}
    on:change={() => ($results = [0, 0])}
  >
    {#each reachTool.allMarkets() as thisMarket}
      <option value={thisMarket.name}>{thisMarket.flag || thisMarket.name}</option>
    {/each}
  </select>
  <label for="market__select"><Fa icon={faSort} color={'var(--ra-teal'} /></label>
</fieldset>

<style>
  fieldset {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    height: 100%;
    padding: 0.4rem 0.6rem;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
  }
  select {
    appearance: none;
    border: none;
    background-color: transparent;
    padding: 0.4em 0.6em 0.4em 0.4em;
  }
  select:focus {
    outline: solid 1px var(--ra-green);
  }
  label {
    background-color: transparent;
    padding: 0.2em 0.4em;
  }
</style>
