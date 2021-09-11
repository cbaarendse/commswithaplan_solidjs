<script>
  let ColorScheme;
  export let colorScheme = ColorScheme.blue;
  export let backgroundColor = 'var(--ra-grey-off-white)';
  export let color = 'var(--ra-grey)';
  export let cardTitle;
  export let imgUrl;
  export let cardFooterText;
  export let cardLink;
  export let cardLinkText;
</script>

<div class="card" style="background-color:{backgroundColor};color:{color};">
  {#if cardTitle}
    <div class="card-title">
      <h2>{cardTitle}</h2>
    </div>
  {/if}
  <p>
    <slot />
  </p>
  {#if imgUrl}
    <img src={imgUrl} alt={cardTitle} />
  {/if}
  <div class="card-footer">
    {#if cardFooterText}
      <p>
        {cardFooterText}
      </p>
    {/if}
    {#if cardLink}
      <a href={cardLink}>{cardLinkText}</a>
    {/if}
  </div>
</div>

<style>
  div.card {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto auto 1fr;
    border-radius: 0.2em;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
  }

  div.card-title {
    padding: 0.8em;
    color: var(--ra-blue);
    text-align: left;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.8em;
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
  img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0.4em auto;
  }

  a {
    color: var(--ra-white);
  }

  div.card-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4em;
    border-radius: 0 0 0.2em 0.2em;
    text-align: left;
    color: var(--ra-grey-light);
    background-color: var(--ra-green-light);
    width: 100%;
  }
</style>
