<script>
  export let sectionTitle;
  export let titleColor = 'var(--ra-blue)';
  export let height = 'fit-content';
</script>

<section>
  {#if sectionTitle}
    <div class="section-title" style="height:{height};">
      <h2 style="color:{titleColor};">{sectionTitle}</h2>
    </div>
  {/if}
  <slot />
</section>

<style>
  section {
    border: 1px dashed var(--ra-green);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
    row-gap: 1em;
    column-gap: 2em;
    padding: 1em;
    margin-bottom: 0.5em;
  }

  div.section-title {
    padding: 2em;
    text-align: center;
  }
</style>
