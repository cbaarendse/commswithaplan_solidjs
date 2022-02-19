<script lang="ts">
  // types
  import type {Card} from '../../../types/interfaces';
  // variables
  import {colorsScheme} from '../../../client/stores';

  // functions
  export let card: Card;
  card.color = 'blue';
</script>

<article
  class="card"
  style:background-color={$colorsScheme[card.color].offWhite}
  style:color={$colorsScheme[card.color].base}
>
  {#if card.imgFile}
    <div class="img-container">
      <img src={card.imgFile} alt={card.title} />
    </div>
  {/if}
  {#if card.title}
    <div class="card-title" style:color={$colorsScheme[card.color].base}>
      <h2>{card.title}</h2>
    </div>
  {/if}
  <p>
    <slot />
  </p>
  <div
    class="card-footer"
    style:background-color={$colorsScheme[card.color].offWhite}
    style:color={$colorsScheme[card.color].light}
  >
    <p>
      <slot name="cardfootertext" />
    </p>
    {#if card.action}
      <a href={card.link} style:color={$colorsScheme[card.color].light}>{card.action}</a>
    {/if}
  </div>
</article>

<style>
  article.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    min-width: 320px;
  }

  .card-title {
    padding: 0.8em 0.8em 0 0.8em;
    text-align: left;
  }
  p {
    flex: 1 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.8em 0.8em 0.8em;
    line-height: 1.7em;
  }

  .img-container {
    overflow: hidden;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    opacity: 0.7;
  }
  .card-footer {
    flex: 0 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4em;
    text-align: left;
    width: 100%;
  }
</style>
