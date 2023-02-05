<script lang="ts">
  // imports
  import Strategies from '../../../../api/strategies/strategies';
  import {Mongo} from 'meteor/mongo';
  import {Meteor} from 'meteor/meteor';
  import createConverter from '/imports/ui/functions/convert';
  import {translations, language} from '../../../stores/utils';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faEdit, faIndent, faXmark} from '@fortawesome/free-solid-svg-icons';
  import {Strategy, StrategyExtension} from '/imports/both/typings/types';

  // collections

  // variables
  let subReady = false;
  const converter = createConverter();
  let strategiesSub: Meteor.SubscriptionHandle;

  $m: {
    strategiesSub = Meteor.subscribe('strategies');
    subReady = strategiesSub.ready();
  }

  $: {
    console.log('subReady in client', subReady);
  }
  let strategies = Strategies.find().fetch();

  // variables

  // functions
</script>

<h3>{converter.translate('strategies', $translations, $language)}</h3>

{#if subReady}
  <ul>
    {#each strategies as strategy}
      <li>
        {strategy.title}{strategy.lastChanged}{strategy.userId}
        <button class="edit"><Fa icon={faEdit} /></button>
        <button class="delete"><Fa icon={faXmark} /></button>
      </li>
    {/each}
  </ul>
{:else}
  <div class="wait">Loading...</div>
{/if}

<style>
  ul {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-between;
    gap: 1.4rem;
  }

  li {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 1fr 1fr;
    gap: 1.4rem;
    border: 1p solid var(--ra-grey-light);
    border-radius: 0.3rem;
  }
</style>
