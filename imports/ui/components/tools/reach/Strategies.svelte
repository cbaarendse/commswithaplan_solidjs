<script lang="ts">
  // imports
  import Strategies from '../../../../api/strategies/strategies';
  import {Mongo} from 'meteor/mongo';
  import {Meteor} from 'meteor/meteor';
  import createConverter from '/imports/ui/functions/convert';
  import {translations, language} from '../../../stores/utils';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faEdit, faIndent, faXmark, faTableList, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
  import {CWAPUser, Strategy, StrategyExtension} from '/imports/both/typings/types';
  import {DateTime} from 'luxon';

  // collections

  // variables
  let subReady = false;
  const converter = createConverter();
  let strategiesSub: Meteor.SubscriptionHandle;
  let strategies: any[];
  let currentUser: CWAPUser | null;

  $m: {
    strategiesSub = Meteor.subscribe('strategies');
    subReady = strategiesSub.ready();
    currentUser = Meteor.user();
  }
  $m: strategies = Strategies.find({}).fetch();

  $: {
    console.log('subReady in client', subReady);
    console.log('strategiesSub in client', strategiesSub);
  }

  // variables

  // functions
</script>

<h3>{converter.translate('strategies', $translations, $language)}</h3>

{#if subReady}
  <ul>
    {#each strategies as strategy}
      <li>
        <span class="date">{DateTime.fromJSDate(strategy.lastChanged).toLocaleString(DateTime.DATETIME_MED)}</span>
        <h4>{strategy.title}</h4>
        <span>{currentUser?.profile?.firstname}&nbsp;{currentUser?.profile?.surname}</span>
        <nav>
          <button class="edit"><Fa icon={faEdit} /></button>
          <button class="edit"><Fa icon={faTableList} /></button>
        </nav>
        <menu><button class="delete"><Fa icon={faXmark} /></button></menu>
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
    gap: 1.4em;
  }

  li {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: space-between;
    gap: 1.4em;
    border: 1px solid var(--ra-grey-bright);
    border-radius: 0.3rem;
    padding: 0.7rem;
  }
  h4 {
    grid-column: span 2;
  }
  span.date {
    font-size: 0.8em;
    grid-column: span 2;
    color: var(--ra-grey-light);
  }
  button {
    background: none;
    border: none;
    width: fit-content;
    height: fit-content;
    font-size: 2.1rem;
    color: grey;
    cursor: pointer;
  }
  a:hover {
    color: var(ra-green);
  }
  button:hover {
    color: var(--ra-red);
  }
</style>
