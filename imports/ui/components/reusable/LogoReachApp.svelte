<script>
  export let size = '3em';
  export let colored = true;
  $: backgroundColor1 = colored ? 'var(--ra-blue)' : 'var(--ra-blue-grayscale)';
  $: backgroundColor2 = colored ? 'var(--ra-green)' : 'var(--ra-green-grayscale)';
  $: backgroundColor3 = colored ? 'var(--ra-red)' : 'var(--ra-red-grayscale)';
</script>

<div class="logo" style="width:{size}; height:{size};">
  <div class="circle1" style="background-color:{backgroundColor1};" />
  <div class="circle2" style="background-color:{backgroundColor2};" />
  <div class="circle3" style="background-color:{backgroundColor3};" />
</div>

<style>
  div.logo {
    position: relative;
    background-color: transparent;
  }
  div.circle1,
  div.circle2,
  div.circle3 {
    position: absolute;
    width: 75%;
    height: 75%;
    border-radius: 50%;
  }

  div.circle1 {
    top: 14%;
    right: 0%;
    z-index: 999;
  }

  div.circle2 {
    top: 5%;
    left: 7.5%;
    z-index: 666;
  }

  div.circle3 {
    left: 0%;
    bottom: 5%;
    z-index: 333;
  }
</style>
