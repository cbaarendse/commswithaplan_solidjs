<script lang="ts">
  // stores
  import {text} from 'svelte/internal';
  import {fontSizes, colorScheme} from '../../../client/stores';
  // interfaces
  import type {Button} from '../../../types/interfaces';

  // properties
  export let btn: Button;

  btn.colors = 'blue';
  btn.buttonSize = {
    fit: {
      padding: '0.4rem 0.6rem',
      width: 'fit-content',
      height: 'fit-content'
    },
    x_small: {
      fontSize: 'fs_xs',
      padding: '0.4rem 0.6rem',
      min_width: '4rem'
    },
    medium: {
      fontSize: 'fs_m',
      padding: '0.4rem 0.6rem',
      min_width: '6rem'
    },
    x_large: {
      fontSize: 'fs_l',
      padding: '0.4rem 0.6rem',
      min_width: '8rem'
    },
    xx_large: {
      fontSize: 'fs_2xl',
      padding: '0.4rem 0.6rem',
      min_width: '10rem'
    }
  };

  // size: 'fit' | 'x_small' | 'medium' | 'large' | 'x_large' | 'xx_large'};
</script>

<button
  type={btn.type}
  role={btn.role}
  style:color={colorScheme[btn.colors].text}
  style:background-color={colorScheme[btn.colors].base}
  style:border={['1px', 'solid', `${colorScheme['blue'].base}`].join(' ')}
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

  .transparant {
    background-color: none;
    color: var(--ra-grey-light);
    border: 1px solid var(--ra-grey);
  }

  .transparantnoborder {
    /* since the button is invisible, min-width is set to initial, so square buttons are possible */
    min-width: 0;
    background-color: transparent;
    color: var(--ra-grey-light);
    border: none;
  }

  button.transparantnoborder:hover {
    /* since the button is invisible, min-width is set to initial, so square buttons are possible */
    min-width: 0;
    background-color: transparent;
    color: var(--ra-grey);
    border: none;
  }
</style>
