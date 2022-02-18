<script lang="ts">
  // stores
  import {sizesScheme, colorsScheme} from '../../../client/stores';
  // interfaces
  import type {Button} from '../../../types/interfaces';

  // properties
  export let btn: Button;

  btn.color = 'blue';
  btn.sizes = 'fit';
</script>

<button
  type={btn.type}
  role={btn.role}
  style:color={colorsScheme[btn.colors].text}
  style:background-color={colorsScheme[btn.colors].base}
  style:border={['1px', 'solid', `${colorsScheme[btn.colors].border}`].join(' ')}
  style:font-size={sizesScheme[btn.sizes].font_size}
  style:padding={sizesScheme[btn.sizes].padding}
  style:width={sizesScheme[btn.sizes].width}
  style:height={sizesScheme[btn.sizes].height}
  style:min-width={sizesScheme[btn.sizes].min_width}
  on:click|preventDefault|stopPropagation={btn.onClick}
  on:mouseenter|preventDefault|stopPropagation={btn.onMouseenter}
  on:mouseleave|preventDefault|stopPropagation={btn.onMouseleave}
  disabled={btn.disabled}
  data-dismiss={btn.dataDismiss}
  aria-label={btn.ariaLabel}
  value={btn.value}
>
  <slot />
</button>

<style>
  button {
    margin: 0 0.4em;
    cursor: pointer;
    border-radius: 5%;
  }

  button:hover {
    opacity: 0.7;
  }
</style>
