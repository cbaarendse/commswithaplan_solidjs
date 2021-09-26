<script>
  // packages

  // constants
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
  export let flipped = false;

  // functions
  const getBackgroundColor = () => colorScheme[colors].offWhite;
  const getFooterColor = () => colorScheme[colors].bright;
  const getFooterBackgroundColor = () => colorScheme[colors].light;
  const getColor = () => colorScheme[colors].base;
</script>

<div class="card" style="background-color:{getBackgroundColor()};color:{getColor()};height:{height}">
  <div class="card-title" style="color:{getColor()};">
    <h2>{cardTitle}</h2>
  </div>
  <div class="card-content" class:flipped>
    <div class="card-front">
      <slot name="image">Image</slot>
    </div>
    <div class="card-back">
      <p>
        <slot name="description">Description</slot>
      </p>
    </div>
  </div>

  <div class="card-footer" style="background-color:{getFooterBackgroundColor()};color:{getBackgroundColor()};">
    <button
      class="flip-content"
      style="border-color:{getFooterColor}; border-width:0.4px; border-style:solid; background-color:{getFooterBackgroundColor()}; color:{getFooterColor()};"
      on:click|preventDefault|stopPropagation>Read</button
    >
  </div>
</div>

<style>
  div.card {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 5fr 2fr 1.5fr;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
  }

  div.card-title {
    padding: 0.8em 0.8em 0 0.8em;
    color: var(--ra-blue);
    text-align: left;
  }

  .card-content {
    position: relative;
    transition: transform 0.8s cubic-bezier(0.42, 0.8, 0.58, 1.4);
    transform-style: preserve-3d;
    perspective: 200%;
  }
  .card-front,
  .card-back {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .card-back {
    transform: rotateY(0.5turn);
  }

  /* .card:hover .card-content, */
  .card-content.flipped {
    transform: rotateY(0.5turn);
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  p {
    position: absolute;
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
    text-align: left;
    width: 100%;
  }

  button {
    height: 90%;
    width: 85%;
    font-size: 1.4rem;
    border-radius: 7px;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.6;
  }
</style>
