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
  let totalReach;
  let locus;
</script>

<header>
  <ReachHeader
    {totalReach}
    {locus}
    {touchPoints}
    {thisReachApp}
    totalReachDisplayName={thisUi.translate('totalReach')}
    locusDisplayName={thisUi.translate('locus')}
  />
</header>
<section>
  <div />
  <!-- TODO: dispatch on:change and on:input -->
  <div class="center">
    {#each thisReachApp.touchPoints as touchPoint}
      <ReachTouchPoint
        {language}
        {inputPlaceholder}
        input={touchPoint.input}
        touchPointName={touchPoint.name}
        touchPointDisplayName={thisReachApp.displayTouchPoint(touchPoint.name)}
        touchPointDescription={thisReachApp.describeTouchPoint(touchPoint.name)}
        on:change
        on:input
      />
    {/each}
  </div>
  <div />
</section>

<style>
  header {
    background-color: var(--ra-teal-off-white);
  }
  section {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    grid-template-rows: auto;
    justify-content: center;
  }
  @media screen and (max-width: 500px) {
    section {
      grid-template-columns: 1fr;
    }
  }
</style>
