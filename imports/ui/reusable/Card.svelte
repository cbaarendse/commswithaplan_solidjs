<script lang="ts">
  // types
  import type {Card} from '../types/types';

  // variables
  export let card: Card;
</script>

<article
  class="card"
  style="background-color:{card.backgroundColor}; font-color:{card.color}; font-size:{card.fontSize}"
>
  {#if card.imgFiles}
    <img src={card.imgFiles[0]} alt={card.title} />
  {/if}
  {#if card.title}
    <h4>{card.title}</h4>
  {/if}
  <p>
    <slot />
  </p>
  {#if $$slots.cardFooterText}
    <p>
      <slot name="cardFooterText" />
    </p>
  {/if}
  {#if card.action}
    <p>
      <a href={card.link}>{card.action}</a>
    </p>
  {/if}
</article>

<style>
  article.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.7em;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
  }

  img {
    flex: 0 0 22em;
    object-fit: cover;
    width: 100%;
    max-height: 22em;
  }

  p {
    flex: 1 0;
    line-height: 1.7em;
    margin: 0.5em 0em;
  }
  a {
    font-size: 0.9em;
  }
  a:hover {
    opacity: 0.7;
  }
</style>
