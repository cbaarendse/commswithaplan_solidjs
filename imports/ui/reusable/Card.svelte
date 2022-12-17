<script lang="ts">
  // types
  import type {Card} from '../types/types';

  // variables
  export let card: Card;
</script>

<article class="card" style="background-color:{card.backgroundColor}; font-color:{card.color}; font-size:{card.sizes}">
  {#if card.imgFiles}
    <img src={card.imgFiles[0]} alt={card.title} />
  {/if}
  {#if card.title}
    <h3>{card.title}</h3>
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
    <a href={card.link}>{card.action}</a>
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
    object-fit: cover;
  }

  p {
    line-height: 1.7em;
    margin: 0.5em 0;
  }

  a:hover {
    opacity: 0.7;
  }
</style>
