<script lang="ts">
  // imports
  import {createEventDispatcher} from 'svelte';
  import type {Input} from '../types/types';

  // variables
  export let input: Input;
  let dispatch = createEventDispatcher();

  // functions
  function submitValue() {
    dispatch('submitValueForName', {name: input.name, value: input.value});
  }
</script>

<form on:submit={submitValue}>
  <div>
    <input
      class={input.className}
      name={input.name}
      id={input.id}
      type="text"
      placeholder={input.placeholder}
      readonly={input.readonly}
      bind:value={input.value}
    />
  </div>
</form>

<style>
  input {
    width: 100%;
    height: var(--ra-m);
    margin: 7px;
    border: 1px solid var(--ra-grey);
    border-radius: 4px;
    background-color: --ra-grey-bright;
  }
</style>
