<script>
  // packages

  // components
  import Modal from '../../components/reusable/Modal.svelte';
  import ReachHeader from '../../components/reach/ReachHeader.svelte';
  import ReachTouchPoint from '../../components/reach/ReachTouchPoint.svelte';

  // constants
  import {touchPointsBasics, translations} from '../../../../client/constants';

  // providers
  import ReachAppProvider from '../../../both/reachAppProvider';
  import UiProvider from '../../../both/uiProvider';

  // variables
  export let language = 'english';
  const thisReachApp = new ReachAppProvider(touchPointsBasics, language);
  const thisUi = new UiProvider(translations, language);
  const touchPoints = thisReachApp.touchPoints;

  let inputPlaceholder = thisUi.translate('input');
  let reach;
  let locus;
</script>

<div class="reach-app">
  <header>
    <ReachHeader
      {reach}
      {locus}
      {touchPoints}
      {thisReachApp}
      totalReachDisplayName={thisUi.translate('totalReach')}
      locusDisplayName={thisUi.translate('locus')}
    />
  </header>
  {#each thisReachApp.touchPoints as touchPoint}
    <ReachTouchPoint
      {language}
      {inputPlaceholder}
      input={touchPoint.input}
      touchPointName={touchPoint.name}
      touchPointDisplayName={thisReachApp.displayTouchPoint(touchPoint.name)}
      touchPointDescription={thisReachApp.describeTouchPoint(touchPoint.name)}
    />
  {/each}
</div>

<style>
  div.reach-app {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    justify-content: center;
    align-items: center;
  }
</style>
