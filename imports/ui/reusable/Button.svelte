<script lang="ts">
  // stores
  import {sizesScheme, colorsScheme} from '../stores/stores';
  // interfaces
  import type {Button} from '../types/interfaces';
  export let btn: Button;

  btn.color = 'blue';
  btn.size = 'fit';
</script>

<button
  type={btn.type}
  role={btn.role}
  style:color={$colorsScheme[btn.color].text}
  style:background-color={$colorsScheme[btn.color].base}
  style:border={['1px', 'solid', `${$colorsScheme[btn.color].border}`].join(' ')}
  style:font-size={$sizesScheme[btn.size].font_size}
  style:padding={$sizesScheme[btn.size].padding}
  style:width={$sizesScheme[btn.size].width}
  style:height={$sizesScheme[btn.size].height}
  style:min-width={$sizesScheme[btn.size].min_width}
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
