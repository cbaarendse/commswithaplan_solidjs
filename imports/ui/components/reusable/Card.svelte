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
      <h4>{cardTitle}</h4>
    </div>
  {/if}
  <p>
    <slot />
  </p>
  {#if imgUrl}
    <img src={imgUrl} alt={cardTitle} />
    <hr />
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
    flex: 1 1 40em;
    max-width: 25em;
    min-height: 15em;
    padding: 2em;
    margin: 2em;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  @media only screen and (max-width: 768px) {
    div.card {
      min-width: 15em;
    }
  }

  div.card-title {
    color: var(--ra-blue);
    text-align: center;
  }
  p {
    margin: 1em;
    font-size: 1.5rem;
  }
  img {
    display: block;
    width: 80%;
    margin: 0 auto;
  }
  hr {
    border-top: 0.5px solid rgba(0, 0, 0, 0.1);
    width: 86%;
  }
  a {
    color: var(--ra-blue);
  }

  div.card-footer {
    padding: 0.5em;
    text-align: left;
    color: var(--ra-grey-light);
  }
</style>
