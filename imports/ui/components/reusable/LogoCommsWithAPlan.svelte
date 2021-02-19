<script>
  export let size = '3rem';
  export let colored = true;
</script>

{#if colored}
  <div
    style="width:{size}; height:{size};font-size:{size}; background: linear-gradient(to bottom, var(--ra-red) 33%,
  var(--ra-green) 33% 67%, var(--ra-blue) 67%);"
  >
    <span>P</span>
  </div>
{:else}
  <div
    style="width:{size}; height:{size};font-size:{size}; background: linear-gradient(to bottom, var(--ra-red-grayscale) 33%, var(--ra-green-grayscale) 33% 67%, var(--ra-blue-grayscale) 67%);"
  >
    <span>P</span>
  </div>
{/if}

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, var(--ra-red) 33%, var(--ra-green) 33% 67%, var(--ra-blue) 67%);
    border-radius: 50%;
  }
  span {
    color: var(--ra-white);
    font-family: 'Stencil Std' 'Trebuchet MS', 'American Typewriter', serif;
    font-size: 0.65em;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
  }
</style>
