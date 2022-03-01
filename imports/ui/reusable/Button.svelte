<script lang="ts">
  // stores
  import {sizesScheme, colorsScheme} from '../stores/stores';
  // interfaces
  import type {Button} from '../types/interfaces';

  // functions
  import {cssVariables} from '/imports/both/functions';

  // variables
  export let btn: Button;

  // css
  const setCssButton = function (element: HTMLElement) {
    element.style.setProperty('background-color', `${$colorsScheme[btn.color].base}`);
    element.style.setProperty('color', `${$colorsScheme[btn.color].text}`);
    element.style.setProperty('border', `${['1px', 'solid', `${$colorsScheme[btn.color].border}`].join(' ')}`);
    element.style.setProperty('font-size', `${$sizesScheme[btn.size].font_size}`);
    element.style.setProperty('padding', `${$sizesScheme[btn.size].padding}`);
    element.style.setProperty('width', `${$sizesScheme[btn.size].width}`);
    element.style.setProperty('height', `${$sizesScheme[btn.size].height}`);
    element.style.setProperty('min-width', `${$sizesScheme[btn.size].min_width}`);
  };
</script>

<button
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
