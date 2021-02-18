<script>
  export let sectionTitle;
</script>

<section>
  {#if sectionTitle}
    <div class="section-title">
      <h2>{sectionTitle}</h2>
    </div>
  {/if}
  <slot />
</section>

<style>
  section {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: stretch;
    padding: 14px;
    margin-bottom: 7px;
  }
  @media only screen and (max-width: 375px) {
    section {
      padding: 0px;
    }
  }

  div.section-title {
    color: var(--ra-blue);
    padding: 7px;
    text-align: center;
  }
</style>
