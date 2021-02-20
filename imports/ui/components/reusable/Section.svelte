<script>
  export let sectionTitle;
  export let titleColor = 'var(--ra-blue)';
</script>

<section>
  {#if sectionTitle}
    <div class="section-title">
      <h2 style="color:{titleColor};">{sectionTitle}</h2>
    </div>
  {/if}
  <div class="section-content"><slot /></div>
</section>

<style>
  section {
    border: 1px dashed var(--ra-green);
    padding: 1em;
    margin-bottom: 0.5em;
  }

  div.section-title {
    padding: 2em;
    text-align: center;
  }
  div.section-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
  }
</style>
