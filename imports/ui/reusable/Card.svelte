<script lang="ts">
  // types
  import type {Card} from '../types/types';

  // variables
  export let card: Card;
</script>

<!-- TODO: change style directive in use:cssVariables, eventually setting different function per element -->
<article class="card" style:background-color={card.style.backgroundColor} style:color={card.style.color}>
  {#if card.imgFile}
    <img src={card.imgFile} alt={card.title} />
  {/if}
  <div class="card__main">
    {#if card.title}
      <div class="card__title" style:color={card.style.color}>
        <h2>{card.title}</h2>
      </div>
    {/if}
    <p>
      <slot />
    </p>
  </div>
  <div class="card__footer" style:background-color={card.style.backgroundColor} style:color={card.style.color}>
    <p>
      <slot name="cardFooterText" />
    </p>
    {#if card.action}
      <a href={card.link} style:color={card.style.color}>{card.action}</a>
    {/if}
  </div>
</article>

<style>
  article.card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  img {
    height: 22rem;
    width: 100%;
    object-fit: cover;
  }

  .card__main {
    flex: 1 0 0;
  }
  .card__title {
    padding: 0.5rem 0;
  }
  .card__main p {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.7em;
    padding: 0.5rem 0;
  }

  .card__footer {
    display: flex;
    justify-content: stretch;
    align-items: center;
    padding: 0.5em 0;
  }
  .card__footer p {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.7em;
    padding: 0.5rem 0;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    opacity: 0.7;
  }
</style>
