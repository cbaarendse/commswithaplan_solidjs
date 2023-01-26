<script lang="ts">
  // imports
  import GenderButton from './GenderButton.svelte';
  import AgeGroupSelect from './AgeGroupSelect.svelte';
  import Checkbox from '../../reusable/Checkbox.svelte';
  import MarketSelect from './MarketSelect.svelte';
  import ReachOutputMeter from './ReachOutputMeter.svelte';
  import Modal from '../../reusable/Modal.svelte';
  import createConverter from '../../functions/convert';
  import createReachTool from '../../functions/reach';
  import createFormatter from '../../functions/format';
  import {language, translations} from '../../stores/utils';
  import {markets, definitions, strategy} from '../../stores/tools';
  import type {Content} from '../../typings/types';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faArrowRotateLeft,
    fa0,
    faArrowDownAZ,
    faArrowDownWideShort,
    faBars,
    faMinus
  } from '@fortawesome/free-solid-svg-icons';

  // variables
  const reachTool = createReachTool();
  const converter = createConverter();
  const formatter = createFormatter();
  let displayOutputDescription: 'none' | 'flex' = 'none';
  let output: Content = $definitions[0];
  let iconSize = '100%';

  $: allTouchPointsValueIsZero = reachTool.areAllTouchPointsValueZero($strategy.deployment);
  let sortedByName = true;
  $: showAll = reachTool.isShowAll($strategy.deployment);
  $: {
    console.log('strategy: ', $strategy);
  }
  // functions
  function showOutputDescription(outputName: string) {
    displayOutputDescription = 'flex';
    output = $definitions.filter((definition) => definition.name === outputName)[0];
  }
  // TODO: at change of market check for existence probabiities for that market and enable/ disable checkbox marketdata
  // TODO: functions in createReachTool
  function reset(): void {
    if (!allTouchPointsValueIsZero) {
      $strategy.deployment = reachTool.setAllTouchPointsToZero($strategy.deployment);
    } else {
      $strategy = reachTool.setNewStrategy('New Strategy', $markets[1], false);
      $strategy.deployment = reachTool.sortByName($strategy.deployment, $language);
      sortedByName = true;
    }
    const results = [0, 0];
    [$strategy.totalReach, $strategy.overlap] = results;
  }

  function sortBy(): void {
    $strategy.deployment = sortedByName
      ? reachTool.sortByReach($strategy.deployment)
      : reachTool.sortByName($strategy.deployment, $language);
    sortedByName = showAll && allTouchPointsValueIsZero ? true : !sortedByName;
  }

  function hideIf(): void {
    if (showAll && !allTouchPointsValueIsZero) {
      $strategy.deployment = reachTool.hide($strategy.deployment);
    } else if (!showAll || allTouchPointsValueIsZero) {
      $strategy.deployment = reachTool.show($strategy.deployment);
    }
  }
</script>

<div class="container">
  <menu>
    <MarketSelect />
    <Checkbox
      cbx={{name: 'marketdata__check'}}
      bind:checked={$strategy.marketData}
      displayName={$strategy.marketData
        ? converter.translate('using_data', $translations, $language)
        : converter.translate('using_formula', $translations, $language)}
    />
    {#if $strategy.marketData}
      <GenderButton />
      <AgeGroupSelect
        ageGroup={$strategy.ageGroupStart ? $strategy.ageGroupStart : [0, '+']}
        name="ageStart"
        displayAge={$strategy.ageGroupStart ? $strategy.ageGroupStart : [0, '+']}
      />
      <AgeGroupSelect
        ageGroup={$strategy.ageGroupStart ? $strategy.ageGroupStart : [0, '+']}
        name="ageEnd"
        displayAge={$strategy.ageGroupStart ? $strategy.ageGroupStart : [0, '+']}
      />
    {/if}
    <button type="button" on:click|stopPropagation|preventDefault={reset}>
      {#if allTouchPointsValueIsZero}<Fa icon={faArrowRotateLeft} size={iconSize} />{:else}<Fa
          icon={fa0}
          size={iconSize}
        />{/if}
    </button>
    <button type="button" on:click|stopPropagation|preventDefault={sortBy}>
      {#if sortedByName}<Fa
          icon={faArrowDownWideShort}
          size={iconSize}
        />{:else if !sortedByName && allTouchPointsValueIsZero && showAll}<Fa
          icon={faArrowDownAZ}
          size={iconSize}
        />{:else}<Fa icon={faArrowDownAZ} size={iconSize} />
      {/if}
    </button>
    <button type="button" on:click={hideIf}>
      {#if showAll}<Fa icon={faMinus} size={iconSize} />{:else}<Fa icon={faBars} size={iconSize} />{/if}
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
  <ReachOutputMeter
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
  <ReachOutputMeter
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
