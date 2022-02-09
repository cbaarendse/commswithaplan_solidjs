<script lang="ts">
  // variables
  export let size: string = '3rem';
  export let colored: boolean = true;
  let backgroundColor1: string;
  let backgroundColor2: string;
  let backgroundColor3: string;
  $: backgroundColor1 = colored ? 'var(--ra-blue)' : 'var(--ra-blue-grayscale)';
  $: backgroundColor2 = colored ? 'var(--ra-green)' : 'var(--ra-green-grayscale)';
  $: backgroundColor3 = colored ? 'var(--ra-red)' : 'var(--ra-red-grayscale)';
</script>

<div
  style:width={size}
  style:height={size}
  style:font-size={size}
  style:background={`linear-gradient(to bottom, ${backgroundColor3} 33%,
  ${backgroundColor2} 33% 67%, ${backgroundColor1} 67%)`}
>
  <span>P</span>
</div>

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
    font-size: 0.9em;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    filter: 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)';
  }
</style>
