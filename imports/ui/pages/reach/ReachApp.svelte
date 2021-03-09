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
<section>
  <aside class="left-aside" />
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
  <aside class="right-aside" />
</section>

<style>
  section {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: repeat(auto-fill, minmax(2em, 1fr));
  }
  aside.left-aside {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: -1;
  }
  aside.right-aside {
    grid-column-start: 5;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: -1;
  }
</style>
