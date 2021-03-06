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

<ReachHeader {reach} {locus} {touchPoints} {thisReachApp} />
{#each thisReachApp.touchPoints as touchPoint}
  <ReachTouchPoint
    input={touchPoint.input}
    touchPointName={touchPoint.name}
    displayName={thisReachApp.displayTouchPoint(touchPoint.name)}
    inputDisplayName={thisUi.display('input')}
  />
{/each}
<TouchPointModal />
