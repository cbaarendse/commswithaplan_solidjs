<script>
  export let size = 'fit'; // or small, medium, large, xlarge
  export let backgroundColor = 'blue'; // or green, red, grey, transparant, transparantnoborder
  export let type = 'button'; // or reset, submit
  export let role = 'button';
  export let dataDismiss;
  export let ariaLabel;
  export let disabled = false;
  export let value;
</script>

<button
  class="{size} {backgroundColor}"
  {type}
  {role}
  on:click|preventDefault|stopPropagation
  on:mouseenter|preventDefault|stopPropagation
  on:mouseleave|preventDefault|stopPropagation
  {disabled}
  data-dismiss={dataDismiss}
  aria-label={ariaLabel}
  {value}
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

  .small {
    min-width: 4rem;
    font-size: 0.7rem;
    padding: 0.4em 0.6em;
  }

  .normal {
    min-width: 6rem;
    font-size: 1rem;
    padding: 0.4em 0.6em;
  }
  .large {
    min-width: 8rem;
    font-size: 1.2rem;
    padding: 0.4em 0.6em;
  }
  .xlarge {
    min-width: 10rem;
    font-size: 1.5rem;
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
