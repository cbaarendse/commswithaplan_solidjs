<script lang="ts">
  // types
  import type {Card} from '../types/interfaces';
  //variables
  import {colorsScheme} from '../stores/stores';
  // functions
  import {cssVariables} from '/imports/both/functions';

  export let card: Card;

  const setCssArticle_Card = function (element: HTMLElement) {
    element.style.setProperty('background-color', `${$colorsScheme[card.color].offWhite}`);
    element.style.setProperty('color', `${$colorsScheme[card.color].base}`);
  };
  const setCssDiv_Card_Title = function (element: HTMLElement) {
    element.style.setProperty('color', `${$colorsScheme[card.color].base}`);
  };
  const setCssDiv_Card_Footer = function (element: HTMLElement) {
    element.style.setProperty('background-color', `${$colorsScheme[card.color].offWhite}`);
    element.style.setProperty('color', `${$colorsScheme[card.color].light}`);
  };
  const setCssCard_Link = function (element: HTMLElement) {
    element.style.setProperty('color', `${$colorsScheme[card.color].light}`);
  };
</script>

<!-- TODO: change style directive in use:cssVariables, eventually setting different function per element -->
<article class="card" use:cssVariables={setCssArticle_Card}>
  {#if card.imgFile}
    <div class="img_container">
      <img src={card.imgFile} alt={card.title} />
    </div>
  {/if}
  {#if card.title}
    <div class="card_title" use:cssVariables={setCssDiv_Card_Title}>
      <h2>{card.title}</h2>
    </div>
  {/if}
  <p>
    <slot />
  </p>
  <div class="card_footer" use:cssVariables={setCssDiv_Card_Footer}>
    <p>
      <slot name="cardfootertext" />
    </p>
    {#if card.action}
      <a href={card.link} use:cssVariables={setCssCard_Link}>{card.action}</a>
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

  .card_title {
    padding: 0.8em 0.8em 0 0.8em;
    text-align: left;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.8em 0.8em 0.8em;
    line-height: 1.7em;
  }

  .img_container {
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
  }

  img {
    object-fit: cover;
    object-position: center;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    opacity: 0.7;
  }
  .card_footer {
    flex: 0 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4em;
    text-align: left;
    width: 100%;
  }
</style>
