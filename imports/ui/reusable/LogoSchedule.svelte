<script>
  export let size = '3em';
  export let colored = true;
  $: backgroundColor1 = colored ? 'var(--ra-blue)' : 'var(--ra-blue-grayscale)';
  $: backgroundColor2 = colored ? 'var(--ra-green)' : 'var(--ra-green-grayscale)';
  $: backgroundColor3 = colored ? 'var(--ra-red)' : 'var(--ra-red-grayscale)';
</script>

<div
  style="width:{size}; height:{size};font-size:{size}; background: linear-gradient(to bottom, {backgroundColor3} 33%,
  {backgroundColor2} 33% 67%, {backgroundColor1} 67%);"
/>

<style>
  div {
    border-radius: 50%;
  }
</style>
