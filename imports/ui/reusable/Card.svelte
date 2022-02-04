<script lang="ts">
  // types
  import type {Card} from '../../../types/interfaces';
  // variables
  import {colorScheme} from '../../../client/stores';
  export let colors: Card['colors'] = 'grey';
  export let title: Card['title'];
  export let imgFile: Card['imgFile'];
  export let link: Card['link'];
  export let action: Card['action'];

  // styling
  function cssStyling(node, styles) {}

  // functions
  const getBackgroundColor = () => $colorScheme[colors].offWhite;
  const getFooterColor = () => $colorScheme[colors].offWhite;
  const getFooterBackgroundColor = () => $colorScheme[colors].light;
  const getColor = () => $colorScheme[colors].base;
</script>

<div class="card" style="background-color:{getBackgroundColor};color:{getColor};">
  {#if imgFile}
    <div class="img-container">
      <img src={imgFile} alt={title} />
    </div>
  {/if}
  {#if title}
    <div class="card-title" style="color:{getColor};">
      <h2>{title}</h2>
    </div>
  {/if}
  <p>
    <slot />
  </p>
  <div class="card-footer" style="background-color:{getFooterBackgroundColor};color:{getFooterColor};">
    <p>
      <slot name="cardfootertext" />
    </p>
    {#if link}
      <a href={link} style="color:{getFooterColor};">{action}</a>
    {/if}
  </div>
</div>

<style>
  div.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    min-width: 320px;
  }

  div.card-title {
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
  div.card-footer {
    flex: 0 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4em;
    text-align: left;
    width: 100%;
  }
</style>
