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
    <img src={card.imgFile} alt={card.title} />
  {/if}
  <div class="card_main">
    {#if card.title}
      <div class="card_title" use:cssVariables={setCssDiv_Card_Title}>
        <h2>{card.title}</h2>
      </div>
    {/if}
    <p>
      <slot />
    </p>
  </div>
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
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  img {
    height: 22rem;
    width: 100%;
    object-fit: cover;
  }

  .card_main {
    flex: 1 0 0;
  }
  .card_title {
    padding: 0.8em;
    text-align: left;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.8em 0.8em 0.8em;
    line-height: 1.7em;
  }

  .card_footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4em;
    text-align: left;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    opacity: 0.7;
  }
</style>
