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
  $: touchPoints = thisReachApp.touchPoints;

  let inputPlaceholder = thisUi.translate('input');
  let totalReach = thisReachApp.totalReach;
  let locus = thisReachApp.locus;

  // functions
  const hide = () => {
    thisReachApp.showAll = !thisReachApp.showAll;
  };
  const sort = () => {};
  const reset = () => {};
  const print = () => {};
  const pdf = () => {};
  const displayTouchPoint = () => {
    !thisReachApp.showAll && touchPoint.value === 0 ? 'none' : 'grid';
  };
  const changeReach = (event) => {
    const touchPoint = event.detail;
    console.log('change for', touchPoint);
    thisReachApp.changeReachForTouchPoint(touchPoint.name, touchPoint.value);
    thisReachApp.calculateResults();
  };
  const inputReach = (event) => {
    const touchPoint = event.detail;
    console.log('input for', touchPoint);
    thisReachApp.changeReachForTouchPoint(touchPoint.name, touchPoint.value);
    thisReachApp.calculateResults();
  };
</script>

<header>
  <ReachHeader
    {totalReach}
    {locus}
    totalReachDisplayName={thisUi.translate('totalReach')}
    locusDisplayName={thisUi.translate('locus')}
    on:reset={reset}
    on:sort={sort}
    on:hide={hide}
    on:print={print}
    on:pdf={pdf}
  />
</header>
<section>
  <div />
  <!-- TODO: dispatch on:change and on:input -->
  <div class="center">
    {#each touchPoints as touchPoint}
      <ReachTouchPoint
        {displayTouchPoint}
        {language}
        {inputPlaceholder}
        {touchPoint}
        touchPointDisplayName={thisReachApp.displayTouchPoint(touchPoint.name)}
        touchPointDescription={thisReachApp.describeTouchPoint(touchPoint.name)}
        on:handleChange={changeReach}
        on:handleInput={inputReach}
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
