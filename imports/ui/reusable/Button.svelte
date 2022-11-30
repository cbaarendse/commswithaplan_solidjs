<script lang="ts">
  // types
  import {Button} from '../types/types';
  import {createEventDispatcher} from 'svelte';

  // variables
  export let btn: Button;
  let dispatch = createEventDispatcher();

  // functions
  function clickedButton() {
    dispatch('clickedButton', {id: btn.id});
  }
  function mouseEntered() {
    dispatch('mouseEntered');
  }
  function mouseLeft() {
    dispatch('mouseLeft');
  }
</script>

<button
  class={btn.class}
  id={btn.id}
  type={btn.type}
  role={btn.role}
  disabled={btn.disabled}
  value={btn.value}
  style="font-size:{btn.fontSize}; background-color:{btn.backgroundColor}; font-color:{btn.color};
  border-width:{btn.borderWidth}; border-style:{btn.borderStyle}; border-color:{btn.borderColor};
  padding:{btn.padding}; width:{btn.width}; height:{btn.height}; minWidth:{btn.minWidth}"
  on:click|preventDefault|stopPropagation={clickedButton}
  on:mouseenter|preventDefault|stopPropagation={mouseEntered}
  on:mouseleave|preventDefault|stopPropagation={mouseLeft}
>
  <slot />
</button>

<style>
  button {
    margin: 0 0.4em;
    cursor: pointer;
    border-radius: 5%;
    border: none;
  }

  button:hover {
    opacity: 0.7;
  }
</style>
