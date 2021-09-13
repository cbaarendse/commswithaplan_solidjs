<script>
  import colorScheme from '../../../../client/constants.js';
  export let colors = 'grey';
  export let height = '35em';
  export let cardTitle;
  export let imgUrl;
  export let cardFooterText;
  export let cardLink;
  export let cardLinkText;

  // functions
  const getBackgroundColor = () => colorScheme[colors].light;
  const getColor = () => colorScheme['blue'].base;
</script>

<div class="card" style="background-color:{getBackgroundColor};color:{getColor};height:{height}">
  <div class="img-container">
    {#if imgUrl}
      <img src={imgUrl} alt={cardTitle} />
    {/if}
  </div>
  {#if cardTitle}
    <div class="card-title" style="background-color:{getBackgroundColor};color:{getColor};">
      <h2>{cardTitle}</h2>
    </div>
  {/if}
  <p>
    <slot />
  </p>
  <div class="card-footer" style="background-color:{getBackgroundColor};color:{getColor};">
    {#if cardFooterText}
      <p>
        {cardFooterText}
      </p>
    {/if}
    {#if cardLink}
      <a href={cardLink}>{cardLinkText}</a>
    {/if}
  </div>
</div>

<style>
  div.card {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 5fr 1fr 2fr 1.5fr;
    /* border-radius: 0.2em; */
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
  }

  div.card-title {
    padding: 0.8em;
    /* color: var(--ra-blue); */
    text-align: left;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.8em;
    font-size: 1.2rem;
    line-height: 1.7rem;
  }

  .img-container {
    overflow: hidden;
    border-radius: 0.2em 0.2em 0 0;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  a {
    color: var(--ra-white);
  }

  div.card-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.4em;
    border-radius: 0 0 0.2em 0.2em;
    text-align: left;
    color: var(--ra-grey-light);
    background-color: var(--ra-green-light);
    width: 100%;
  }
</style>
