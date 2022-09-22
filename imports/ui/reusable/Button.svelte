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
  class={btn.className}
  id={btn.id}
  type={btn.type}
  role={btn.ariaRoleDescription}
  disabled={btn.disabled}
  aria-label={btn.ariaLabel}
  value={btn.value}
  style:font-size={btn.style.fontSize}
  style:background-color={btn.style.backgroundColor}
  style:color={btn.style.color}
  style:borderWidth={btn.style.borderWidth}
  style:borderStyle={btn.style.borderStyle}
  style:borderColor={btn.style.borderColor}
  style:padding={btn.style.padding}
  style:width={btn.style.width}
  style:height={btn.style.height}
  style:minWidth={btn.style.minWidth}
  on:click|preventDefault|stopPropagation={clickedButton}
  on:mouseenter|preventDefault|stopPropagation={mouseEntered}
  on:mouseleave|preventDefault|stopPropagation={mouseLeft}
>
  <span><slot /></span>
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
