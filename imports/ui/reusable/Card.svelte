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

  <p>
    <slot name="cardFooterText" />
  </p>
  {#if card.action}
    <a href={card.link}>{card.action}</a>
  {/if}
</article>

<style>
  article.card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.7em;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
  }

  img {
    height: 22em;
    width: 100%;
    object-fit: cover;
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.7em;
    margin: 0.5em 0;
  }

  a:hover {
    opacity: 0.7;
  }
</style>
