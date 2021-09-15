<script>
  const colorScheme = {
    blue: {
      base: 'var(--ra-blue)',
      light: 'var(--ra-blue-light)',
      bright: 'var(--ra-blue-bright)',
      offWhite: 'var(--ra-blue-off-white)',
    },
    green: {
      base: 'var(--ra-green)',
      light: 'var(--ra-green-light)',
      bright: 'var(--ra-green-bright)',
      offWhite: 'var(--ra-green-off-white)',
    },
    red: {
      base: 'var(--ra-red)',
      light: 'var(--ra-red-light)',
      bright: 'var(--ra-red-bright)',
      offWhite: 'var(--ra-red-off-white)',
    },
    teal: {
      base: 'var(--ra-teal)',
      light: 'var(--ra-teal-light)',
      bright: 'var(--ra-teal-bright)',
      offWhite: 'var(--ra-teal-off-white)',
    },
    grey: {
      base: 'var(--ra-grey)',
      light: 'var(--ra-grey-light)',
      bright: 'var(--ra-grey-bright)',
      offWhite: 'var(--ra-grey-off-white)',
    },
  };
  export let colors = 'grey';
  export let height = '35em';
  export let cardTitle;
  export let imgUrl;
  export let cardFooterText;
  export let cardLink;
  export let cardLinkText;

  // functions
  const getBackgroundColor = () => colorScheme[colors].offWhite;
  const getFooterBackgroundColor = () => colorScheme[colors].light;
  const getColor = () => colorScheme[colors].base;
</script>

<div class="card" style="background-color:{getBackgroundColor()};color:{getColor()};height:{height}">
  <div class="img-container">
    {#if imgUrl}
      <img src={imgUrl} alt={cardTitle} />
    {/if}
  </div>
  {#if cardTitle}
    <div class="card-title" style="color:{getColor()};">
      <h2>{cardTitle}</h2>
    </div>
  {/if}
  <p>
    <slot />
  </p>
  <div class="card-footer" style="background-color:{getFooterBackgroundColor()};color:{getBackgroundColor()};">
    {#if cardFooterText}
      <p>
        {cardFooterText}
      </p>
    {/if}
    {#if cardLink}
      <a href={cardLink} style="color:{getBackgroundColor()};">{cardLinkText}</a>
    {/if}
  </div>
</div>

<style>
  div.card {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 5fr 1fr 2fr 1.5fr;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
  }

  div.card-title {
    padding: 0.8em 0.8em 0 0.8em;
    /* color: var(--ra-blue); */
    text-align: left;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.8em 0.8em 0.8em;
    font-size: 1.2rem;
    line-height: 1.7rem;
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
    font-size: 1.6rem;
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
