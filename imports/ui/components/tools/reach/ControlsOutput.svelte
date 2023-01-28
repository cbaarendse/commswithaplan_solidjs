<script lang="ts">
  // imports
  import GenderButton from './GenderButton.svelte';
  import AgeGroupSelect from './AgeGroupSelect.svelte';
  import MarketDataCheck from './MarketDataCheck.svelte';
  import MarketSelect from './MarketSelect.svelte';
  import OutputMeter from './OutputMeter.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import createConverter from '../../../functions/convert';
  import createReachTool from '../../../functions/reach';
  import createFormatter from '../../../functions/format';
  import {language, translations} from '../../../stores/utils';
  import {definitions, strategy} from '../../../stores/tools';
  import type {Content} from '../../../typings/types';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faArrowRotateLeft,
    fa0,
    faArrowDownAZ,
    faArrowDownWideShort,
    faBars,
    faMinus
  } from '@fortawesome/free-solid-svg-icons';

  // TODO: at change of market check for existence probabilities for that market and enable/ disable checkbox marketdata
  // variables
  const reachTool = createReachTool();
  const converter = createConverter();
  const formatter = createFormatter();
  let displayOutputDescription: 'none' | 'flex' = 'none';
  let output: Content = $definitions[0];
  let iconSize = '100%';
  let indexStart: number = 0;
  let indexEnd: number = 5;
  const ageGroupsForMarkets = reachTool.setAgeGroupsForMarkets();
  let ageGroupsForMarket = ageGroupsForMarkets.find((item) => item.marketName == $strategy.market?.name);
  function groupsForAgeEnd() {
    let index = ageGroupsForMarket?.groups.indexOf($strategy.ageGroupStart);
    return ageGroupsForMarket?.groups.slice(index ? index + 1 : 1);
  }

  // functions
  function showOutputDescription(outputName: string) {
    displayOutputDescription = 'flex';
    output = $definitions.filter((definition) => definition.name === outputName)[0];
  }

  function reset() {
    $strategy = reachTool.reset($strategy, $language);
  }

  function sort() {
    $strategy = reachTool.sort($strategy, $language);
  }

  function hide() {
    $strategy.deployment = reachTool.hide($strategy.deployment);
  }
</script>

<div class="container">
  <menu>
    <MarketSelect />
    <MarketDataCheck />
    {#if $strategy.marketData}
      <GenderButton />
      <AgeGroupSelect bind:indexStart groups={[0, 1, 2, 3, 4, 5]} name="age-start__select" id="age-start__select" />
      <AgeGroupSelect bind:indexEnd groups={[0, 1, 2, 3, 4, 5]} name="age-end__select" id="age-end__select" />
    {/if}
  </menu>
  <menu>
    <button type="button" on:click|stopPropagation|preventDefault={reset}>
      {#if reachTool.areAllTouchPointsValueZero($strategy.deployment)}<Fa
          icon={faArrowRotateLeft}
          size={iconSize}
        />{:else}<Fa icon={fa0} size={iconSize} />{/if}
    </button>
    <button type="button" on:click|stopPropagation|preventDefault={sort}>
      {#if $strategy.sortedByName}<Fa
          icon={faArrowDownWideShort}
          size={iconSize}
        />{:else if !$strategy.sortedByName && reachTool.areAllTouchPointsValueZero($strategy.deployment) && reachTool.isShowAll($strategy.deployment)}<Fa
          icon={faArrowDownAZ}
          size={iconSize}
        />{:else}<Fa icon={faArrowDownAZ} size={iconSize} />
      {/if}
    </button>
    <button type="button" on:click={hide}>
      {#if reachTool.isShowAll($strategy.deployment)}<Fa icon={faMinus} size={iconSize} />{:else}<Fa
          icon={faBars}
          size={iconSize}
        />{/if}
    </button>
  </menu>
</div>
<div class="container">
  <label on:click|preventDefault|stopPropagation={() => showOutputDescription('total_reach')}>
    <span>
      {converter.translate('total', $translations, $language)}&nbsp;{converter.translate(
        'reach',
        $translations,
        $language
      )}:&nbsp;
    </span>
    <output>{formatter.toNumberFormat($strategy.totalReach, 0)}&nbsp;%</output>
  </label>
  <OutputMeter
    outputMeter={{
      id: 'reach',
      value: $strategy.totalReach,
      min: 0,
      max: 100
    }}
  />

  <label on:click|preventDefault|stopPropagation={() => showOutputDescription('overlap')}>
    <span>{converter.translate('overlap', $translations, $language)}:&nbsp;</span>
    <output>{formatter.toNumberFormat($strategy.overlap, 0)}&nbsp;%</output>
  </label>
  <OutputMeter
    outputMeter={{
      id: 'overlap',
      value: $strategy.overlap,
      min: 0,
      max: 100
    }}
  />
</div>

<Modal
  title={output.displayName}
  display={displayOutputDescription}
  on:destroyModal={() => {
    displayOutputDescription = 'none';
  }}
>
  {output.description}
</Modal>

<style>
  div.container {
    display: flex;
    flex-flow: row wrap;
    gap: 1.4em;
    justify-content: flex-start;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }
  menu {
    flex: 100%;
    display: flex;
    gap: 7%;
    justify-content: flex-start;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.6em;
    height: 3.6em;
    font-size: 1em;
    border-radius: 50%;
    border: none;
    color: var(--ra-white);
    cursor: pointer;
  }
  button:hover {
    opacity: 0.7;
  }
  menu > button:nth-of-type(1) {
    background-color: var(--ra-red);
  }
  menu > button:nth-of-type(2) {
    background-color: var(--ra-green);
  }
  menu > button:nth-of-type(3) {
    background-color: var(--ra-blue);
  }

  label {
    flex: 0 1 30rem;
    display: flex;
    gap: 1em;
    font-size: 1.1em;
    cursor: pointer;
  }
  label:hover {
    opacity: 0.7;
  }
  span {
    flex: 2;
  }

  output {
    flex: 1;
  }

  :global(meter) {
    flex: 1 1 60%;
  }

  :global(div.meter) {
    flex: 1 1 60%;
  }

  @media screen and (min-width: 768px) {
    button {
      font-size: 1em;
    }
  }

  @media screen and (min-width: 1024px) {
    button {
      font-size: 1em;
    }
  }
</style>
