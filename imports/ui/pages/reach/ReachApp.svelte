<script>
  // packages
  import {Meteor} from 'meteor/meteor';
  import {onMount} from 'svelte';

  // providers
  import ReachProvider from '../../../both/reachProvider';

  // components
  import ReachHeader from '../reach/ReachHeader.svelte';
  import ReachTouchPoint from '../reach/ReachTouchPoint.svelte';
  import TouchPointModal from '../reach/TouchPointModal.svelte';

  // variables
  const thisReachApp = new ReachProvider();
  const touchPoints = thisReachApp.touchPoints;

  let input;
  let reach;
  let locus;
</script>

<main>
  <ReachHeader {reach} {locus} {touchPoints} />
  {#each touchPoints as touchPoint}
    <ReachTouchPoint {input} {touchPoint} />
  {/each}
  <TouchPointModal />
</main>
