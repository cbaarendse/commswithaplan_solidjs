<script>
  // packages

  // components
  import Slider from '../reusable/Slider.svelte';
  import Modal from '../reusable/Modal.svelte';

  // constants
  import {translations} from '../../../../client/constants';

  // providers
  import UiProvider from '../../../both/uiProvider';

  // variables
  export let input = 0;
  export let touchPointName;
  export let touchPointDisplayName;
  export let touchPointDescription;
  export let inputPlaceholder;
  export let language;

  const thisUi = new UiProvider(translations, language);

  let slidingInput;
  let checked;
  let display = 'block';
  let sliding = false;

  const defaultInput = 50;
  let updating = false;

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
  <button>
    <img class={checked} alt="{touchPointName}-Icon" src="/{touchPointName}.png" />
  </button>
  <!-- TODO: touchpoint name in label -->
  <Slider defaultValue={defaultInput} bind:value={input} displayName={touchPointDisplayName} />

  {#if updating}
    <form class="touchpoint-input-form float-right">
      <div class="form-group">
        <input
          type="text"
          class="form-control text-right touchpoint-input"
          placeholder={inputPlaceholder}
          aria-describedby="sizing-addon2"
        />
      </div>
    </form>
  {:else if sliding}
    {thisUi.toStringFormat(slidingInput)}
  {:else}
    {thisUi.toStringFormat(input)}
  {/if}
  <Modal title={touchPointDisplayName}>{touchPointDescription}</Modal>
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--ra-teal-off-white);
    margin: 0.5em 0;
    padding: 1em;
    border-radius: 0.6em;
  }

  img {
    background-color: var(--ra-teal-light);
  }

  button {
    height: 4em;
    width: 4em;
    padding: 0.5em;
    border-radius: 50%;
    border: none;
    background-color: var(--ra-white);
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
  }
</style>
