<script lang="ts">
  // imports
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
  import reachTool from '/imports/ui/functions/reach';

  // variables
  let strategy = reachTool.getStrategy();
  $: disabled = (strategy.marketData && strategy.useMarketData) || false;
  $: console.log('$: strategy.genders in genderButton: ', strategy.genders);

  // exports

  // functions
  function toggleGenders() {
    console.log('genders in/ before togglegenders: ', strategy.genders);
    if (strategy.marketData && strategy.genders) {
      if (strategy.genders.has('f') && strategy.genders.has('m') && strategy.genders.has('x')) {
        strategy.genders.clear();
      } else if (!strategy.genders.has('f') && !strategy.genders.has('m') && !strategy.genders.has('x')) {
        strategy.genders.add('f');
      } else if (strategy.genders.has('f') && !strategy.genders.has('m') && !strategy.genders.has('x')) {
        strategy.genders.delete('f');
        strategy.genders.add('m');
      } else if (!strategy.genders.has('f') && strategy.genders.has('m') && !strategy.genders.has('x')) {
        strategy.genders.add('f');
      } else if (strategy.genders.has('f') && strategy.genders.has('m') && !strategy.genders.has('x')) {
        strategy.genders.add('x');
      }
    }
    reachTool.setStrategy(strategy);
  }

  console.log('strategy.genders in genderButton: end', strategy.genders);
</script>

<button
  class="genders__toggle"
  type="submit"
  aria-roledescription="button"
  {disabled}
  on:click|preventDefault|stopPropagation={toggleGenders}
>
  <Fa icon={faPersonDress} color={strategy.genders?.has('f') ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
  <Fa icon={faPerson} color={strategy.genders?.has('m') ? 'var(--ra-red)' : 'var(--ra-grey-light'} />
</button>

<style>
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.6rem;
    height: 3.6rem;
    font-size: 1em;
    margin: 0 0.4em;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5%;
    border: none;
  }
</style>
