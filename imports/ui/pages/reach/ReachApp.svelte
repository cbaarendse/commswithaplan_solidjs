<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';
  import {onMount} from 'svelte';
  // components
  import TouchPointModal from '../../components/reach/TouchPointModal.svelte';
  import ReachHeader from '../../components/reach/ReachHeader.svelte';
  import ReachTouchPoint from '../../components/reach/ReachTouchPoint.svelte';

  // constants
  import {touchPointsBasics, tranlations} from '../../../../client/constants';

  // providers
  import ReachAppProvider from '../../../both/reachAppProvider';
  import UiProvider from '../../../both/uiProvider';

  // variable
  $: language = useSession('language');
  // TODO: touchpointsbasics in reachprovider? Language in ui?
  const thisReachApp = new ReachAppProvider(touchPointsBasics, $language);
  const thisUi = newUiProvider(translations);

  const touchPoints = thisReachApp.touchPoints;
  let input;
  let reach;
  let locus;
</script>

<ReachHeader {reach} {locus} {touchPoints} />
{#each touchPoints as touchPoint}
  <ReachTouchPoint {input} {touchPoint} />
{/each}
<TouchPointModal />
