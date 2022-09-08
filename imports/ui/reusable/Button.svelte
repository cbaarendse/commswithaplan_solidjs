<script lang="ts">
  // types
  import {createEventDispatcher} from 'svelte';

  // variables
  import {cssVariables} from '/imports/both/functions';
  export let btn: HTMLButtonElement;
  let dispatch = createEventDispatcher();

  // css
  const setCssButton = function (element: HTMLElement) {
    element.style.backgroundColor = `${btn.style.backgroundColor}`;
    element.style.color = `${btn.style.color}`;
    element.style.borderWidth = `${btn.style.borderWidth}`;
    element.style.borderStyle = `${btn.style.borderStyle}`;
    element.style.borderColor = `${btn.style.borderColor}`;
    element.style.fontSize = `${btn.style.fontSize}`;
    element.style.padding = `${btn.style.padding}`;
    element.style.width = `${btn.style.width}`;
    element.style.height = `${btn.style.height}`;
    element.style.minWidth = `${btn.style.minWidth}`;
  };

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
  on:click|preventDefault|stopPropagation={clickedButton}
  on:mouseenter|preventDefault|stopPropagation={mouseEntered}
  on:mouseleave|preventDefault|stopPropagation={mouseLeft}
  use:cssVariables={setCssButton}
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
