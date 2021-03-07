<script>
  // packages

  // components
  import TouchPointModal from '../../components/reach/TouchPointModal.svelte';
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

  let reach;
  let locus;
</script>

<ReachHeader
  {reach}
  {locus}
  {touchPoints}
  {thisReachApp}
  totalReachDisplayName={thisUi.translate('totalReach')}
  locusDisplayName={thisUi.translate('locus')}
/>
{#each thisReachApp.touchPoints as touchPoint}
  <ReachTouchPoint
    {language}
    input={touchPoint.input}
    touchPointName={touchPoint.name}
    displayName={thisReachApp.displayTouchPoint(touchPoint.name)}
    inputDisplayName={thisUi.translate('input')}
  />
{/each}
<TouchPointModal />
