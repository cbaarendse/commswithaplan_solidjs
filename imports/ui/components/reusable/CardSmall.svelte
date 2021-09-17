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
  export let height = '25em';
  export let cardTitle;
  export let imgUrl;
  export let flipped = false;

  // functions
  const getBackgroundColor = () => colorScheme[colors].offWhite;
  const getFooterBackgroundColor = () => colorScheme[colors].light;
  const getColor = () => colorScheme[colors].base;
</script>

<div class="card" style="background-color:{getBackgroundColor()};color:{getColor()};height:{height}">
  {#if cardTitle}
    <div class="card-title" style="color:{getColor()};">
      <h2>{cardTitle}</h2>
    </div>
  {/if}
  <div class="card-content">
    <div class="card-content-inner">
      <div class="img-container" class:flipped={!flipped}>
        {#if imgUrl}
          <img src={imgUrl} alt={cardTitle} />
        {/if}
      </div>
      <p class:flipped>
        <slot />
      </p>
    </div>
  </div>
  <div class="card-footer" style="background-color:{getFooterBackgroundColor()};color:{getBackgroundColor()};">
    <button class="flip-content" on:click|preventDefault|stopPropagation>Read</button>
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

  div.card-content {
    /* width: 100%;
    height: 100%; */
    perspective: 300%;
  }

  div.card-content-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .img-container,
  p {
    position: absolute;
    backface-visibility: hidden;
  }

  .img-container {
    overflow: hidden;
    transform: rotateY(180deg);
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.8em 0.8em 0.8em;
    font-size: 1.2rem;
    line-height: 1.7rem;
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
