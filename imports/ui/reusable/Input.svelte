<script lang="ts">
  // imports
  // types
  import 
  // variables
  export let type: string;
  export let value: string;
  export let placeholder: string;
  export let name: string;
  export let id: string;
  export let readonly: boolean = false;
</script>

<input class={type} {value} {placeholder} {name} {id} {readonly} />

<style>
  input {
    width: 100%;
    margin: 7px;
    border: 1px solid var(--ra-grey);
    border-radius: 4px;
    background-color: --ra-grey-bright;
  }

  .small {
    height: 0.5rem;
  }
  .normal {
    height: 1rem;
  }
  .large {
    height: 1.5rem;
  }
  .xlarge {
    height: 2rem;
  }
</style>
