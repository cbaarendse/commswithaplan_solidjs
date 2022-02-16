<script lang="ts">
  // stores
  import {fontSizes, colorScheme, buttonStyles} from '../../../client/stores';
  // interfaces
  import type {Button, ButtonStyle} from '../../../types/interfaces';

  // properties
  export let btn: Button;

  btn.size = 'fit';
  btn.backgroundColor = 'blue';
  btn.style = {};
</script>

<button
  type={btn.type}
  role={btn.role}
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
  }

  .fit {
    width: fit-content;
    height: fit-content;
    padding: 0;
  }

  .x_small {
    min-width: 4rem;
    font-size: var(--font-size-xs);
    padding: 0.4em 0.6em;
  }

  .normal {
    min-width: 6rem;
    font-size: var(--font-size-m);
    padding: 0.4em 0.6em;
  }
  .x_large {
    min-width: 8rem;
    font-size: var(--font-size-xl);
    padding: 0.4em 0.6em;
  }
  .xx_large {
    min-width: 10rem;
    font-size: var(--font-size-2xl);
    padding: 0.4em 0.6em;
  }

  .blue,
  .green,
  .red,
  .grey,
  .transparant {
    border-radius: 5%;
  }
  .blue,
  .green,
  .red,
  .grey {
    color: var(--ra-white);
  }
  .blue {
    background-color: var(--ra-blue);
    border: 1px solid var(--ra-blue);
  }
  .green {
    background-color: var(--ra-green);
    border: 1px solid var(--ra-green);
  }
  .red {
    background-color: var(--ra-red);
    border: 1px solid var(--ra-red);
  }
  .grey {
    background-color: var(--ra-grey);
    border: 1px solid var(--ra-grey);
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

  button.blue:hover {
    background-color: var(--ra-blue-light);
  }

  button.green:hover {
    background-color: var(--ra-green-light);
  }
  button.red:hover {
    background-color: var(--ra-red-light);
  }
  button.grey:hover {
    background-color: var(--ra-grey-light);
  }

  button.transparant:hover {
    color: var(--ra-grey);
  }

  button.transparantnoborder:hover {
    /* since the button is invisible, min-width is set to initial, so square buttons are possible */
    min-width: 0;
    background-color: transparent;
    color: var(--ra-grey);
    border: none;
  }
</style>
