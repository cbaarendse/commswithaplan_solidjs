<script>
  // packages
  import {createEventDispatcher} from 'svelte';
  import {translate} from '../../functions';

  // providers
  import ReachAppProvider from '../../../both/reachAppProvider';
  import UiProvider from '../../../both/uiProvider';

  // constants
  import {touchPointsBasics, translations} from '../../../../client/constants';
  const thisReachApp = new ReachAppProvider(touchPointsBasics);
  const thisUi = new UiProvider(translations);

  // variables
  import {language} from '../../../client/stores';
  export let size = 'normal'; // or small, large, xlarge
  export let list;
  export let selectedItem;
  export let id;
  export let name;

  // functions
  const dispatch = createEventDispatcher();
</script>

<select class={size} {id} {name} bind:value={selectedItem} on:change={() => dispatch('selectItem', {selectedItem})}>
  {#each list as item (item._id)}
    <option value={item}>{thisUi.translate(item.name, $language) || item.name}</option>
  {/each}
</select>

<style>
  select {
    width: 100%;
    margin: 7px;
    border: none;
    background-color: --ra-grey-bright;
  }

  .small {
    height: 0.5rem;
  }
  .normal {
    height: 1rem;
  }
  .large {
    height: 1.5rem;
  }
  .xlarge {
    height: 2rem;
  }
</style>
