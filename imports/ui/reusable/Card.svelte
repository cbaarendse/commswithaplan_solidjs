<script>
  // constants
  import {colorScheme} from '../../../client/constants';

  // variables
  export let colors = 'grey';
  export let cardTitle;
  export let imgUrl;
  export let cardLink;
  export let callToAction;

  // functions
  const getBackgroundColor = () => colorScheme[colors].offWhite;
  const getFooterBackgroundColor = () => colorScheme[colors].light;
  const getColor = () => colorScheme[colors].base;
</script>

<div class="card" style="background-color:{getBackgroundColor()};color:{getColor()};">
  {#if imgUrl}
    <div class="img-container">
      <img src={imgUrl} alt={cardTitle} />
    </div>
  {/if}
  {#if cardTitle}
    <div class="card-title" style="color:{getColor()};">
      <h2>{cardTitle}</h2>
    </div>
  {/if}
  <p>
    <slot name="description" />
  </p>
  <div class="card-footer" style="background-color:{getFooterBackgroundColor()};color:{getBackgroundColor()};">
    <p>
      <slot name="cardfootertext" />
    </p>
    {#if cardLink}
      <a href={cardLink} style="color:{getBackgroundColor()};">{callToAction}</a>
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
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4em;
    text-align: left;
    width: 100%;
  }
</style>
