<script>
  // packages

  // components
  import Slider from '../reusable/Slider.svelte';

  // variables
  export let input;
  export let touchPointName;
  export let touchPointDisplayName;
  export let inputDisplayName;

  let checked;
  let display = 'block';
  let sliding = false;
  let slidingInput;
  const defaultInput = 50;
  let updating = false;

  import {toStringFormat} from '../../../../client/functions';
  //import {notify} from '../../notifications/NotificationsFunctions';

  // functions
  const toggleCheck = () => {
    touchPoint.selected = !selected;
    touchPoint.input = 0;
    touchPoint.reach = 0;
    touchPoint.ots = 0;
  };

  const displayTouchPoint = (event) => {
    // show modal
  };

  const handleInput = (event) => {
    const input = event.detail.value;
    touchPoints[selectedTouchPoint].input = input;
  };

  const mouseUpTouchPoint = () => {
    reachProvider.calculateReach();
    reachProvider.calculateLocus();
  };

  const focusInput = () => {
    updating = true;
  };

  const focusOutInput = () => {
    updating = false;
  };
</script>

<div {display}>
  <img
    class="align-self-center mr-2 touchPointIcon {checked}"
    alt="{touchPointName}-Icon"
    src="/{touchPointName}.png"
  />
  <span class="display-name {checked}">{touchPointDisplayName}</span>

  <Slider defaultValue={defaultInput} bind:value={input} />

  {#if updating}
    <form class="touchpoint-input-form float-right">
      <div class="form-group">
        <input
          type="text"
          class="form-control text-right touchpoint-input"
          placeholder={inputDisplayName}
          aria-describedby="sizing-addon2"
        />
      </div>
    </form>
  {:else if sliding}
    {toStringFormat(slidingInput)}
  {:else}
    {toStringFormat(input)}
  {/if}
</div>

<style>
  div {
    display: flex;
    background-color: var(--ra-teal-surface);
  }
</style>
