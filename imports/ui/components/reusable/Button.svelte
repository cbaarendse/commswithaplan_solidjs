<script>
  export let size = 'normal'; // or small, large, xlarge
  export let color = 'blue'; // or green, red, grey, transparant
  export let type = 'button'; // or reset, submit
  export let dataDismiss;
  export let ariaLabel;
  export let disabled = false;
</script>

<button
  class={`${size}+" "+${color}`}
  {type}
  on:click|preventDefault
  {disabled}
  data-dismiss={dataDismiss}
  aria-label={ariaLabel}
>
  <slot />
</button>

<style>
  button {
    border: none;
  }

  .small {
    height: 0.5rem;
    width: 1rem;
  }

  .normal {
    height: 1rem;
    width: 2rem;
  }
  .large {
    height: 1.5rem;
    width: 3rem;
  }
  .xlarge {
    height: 2rem;
    width: 4rem;
  }

  .blue {
    background-color: var(--ra-blue);
    color: white;
  }
  .green {
    background-color: var(--ra-green);
    color: white;
  }
  .red {
    background-color: var(--ra-red);
    color: white;
  }
  .grey {
    background-color: var(--ra-grey);
    color: white;
  }

  .transparant {
    background-color: none;
    color: var(--ra-grey);
    border: 1px solid var(--ra-grey);
  }

  .transparantnoborder {
    background-color: none;
    color: var(--ra-grey);
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
</style>
