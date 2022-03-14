<script lang="ts">
  // types
  import type {Button} from '../types/types';

  // variables
  import {cssVariables} from '/imports/both/functions';
  export let btn: Button;

  // css
  const setCssButton = function (element: HTMLElement) {
    element.style.setProperty('background-color', `${btn.backgroundColor}`);
    element.style.setProperty('color', `${btn.textColor}`);
    element.style.setProperty('border-width', `${btn.borderWidth}`);
    element.style.setProperty('border-style', `${btn.borderStyle}`);
    element.style.setProperty('border-color', `${btn.borderColor}`);
    element.style.setProperty('font-size', `${btn.fontSize}`);
    element.style.setProperty('padding', `${btn.padding}`);
    element.style.setProperty('width', `${btn.width}`);
    element.style.setProperty('height', `${btn.height}`);
    element.style.setProperty('min-width', `${btn.minWidth}`);
  };
</script>

<button
  class={btn.className}
  type={btn.type}
  role={btn.role}
  disabled={btn.disabled}
  data-dismiss={btn.dataDismiss}
  aria-label={btn.ariaLabel}
  value={btn.value}
  on:click|preventDefault|stopPropagation={btn.onClick}
  on:mouseenter|preventDefault|stopPropagation={btn.onMouseenter}
  on:mouseleave|preventDefault|stopPropagation={btn.onMouseleave}
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
