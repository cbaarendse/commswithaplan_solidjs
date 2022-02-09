<script lang="ts">
  // variables
  export let size: string = '3em';
  export let colored: boolean = true;
  let backgroundColor1: string;
  let backgroundColor2: string;
  let backgroundColor3: string;
  $: backgroundColor1 = colored ? 'var(--ra-blue)' : 'var(--ra-blue-grayscale)';
  $: backgroundColor2 = colored ? 'var(--ra-green)' : 'var(--ra-green-grayscale)';
  $: backgroundColor3 = colored ? 'var(--ra-red)' : 'var(--ra-red-grayscale)';
</script>

<div
  style:width={size}
  style:height={size}
  style:font-size={size}
  style:background={`linear-gradient(to bottom, ${backgroundColor3} 33%,
  ${backgroundColor2} 33% 67%, ${backgroundColor1} 67%)`}
/>

<style>
  div {
    border-radius: 50%;
  }
</style>
