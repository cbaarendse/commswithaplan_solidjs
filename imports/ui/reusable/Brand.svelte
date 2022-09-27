<script lang="ts">
  // variables
  export let brand: Omit<svelteHTML.IntrinsicElements['div'], 'size'> &
    Omit<svelteHTML.IntrinsicElements['span'], 'size'> & {size?: string | null | undefined};
</script>

<div class="brand">
  <slot />
  <span style:font-size={brand.size} style:color={brand.color}>
    {brand.title}
  </span>
</div>

<style>
  .brand {
    align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.7em;
    align-items: center;
    font-family: 'Trebuchet MS';
  }
</style>
