<script>
  export let title;
</script>

<div class="title">
  <slot>
    {#if title}
      <h2>{title}</h2>
    {/if}
  </slot>
</div>

<style>
  div.title {
    color: var(--ra-blue);
    padding: 7px;
    padding: 28px;
    width: 100%;
    margin-bottom: 0px 7px;
    text-align: center;
  }
</style>
