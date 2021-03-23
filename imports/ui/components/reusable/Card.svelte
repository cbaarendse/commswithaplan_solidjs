<script>
  import {compute_slots} from 'svelte/internal';

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
  {#if cardFooterText || cardLink}
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
  {/if}
</div>

<style>
  div.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    max-width: 25em;
    min-height: 15em;
    padding: 2em;
    margin: 2em;
    border-radius: 0.2em;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
  }
  @media only screen and (max-width: 768px) {
    div.card {
      min-width: 15em;
    }
  }
  div.card-title {
    color: var(--ra-blue);

    text-align: left;
  }
  p {
    flex: 1 1 auto;
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
  img {
    display: block;
    width: 80%;
    margin: 0 auto;
  }

  a {
    color: var(--ra-blue);
  }

  div.card-footer {
    padding: 0.5em 0;
    text-align: left;
    color: var(--ra-grey-light);
  }
</style>
