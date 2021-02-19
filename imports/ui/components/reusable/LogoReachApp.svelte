<script>
  export let size = '3em';
</script>

<div class="logo" style="width:{size}; height:{size};">
  <div class="blue" />
  <div class="green" />
  <div class="red" />
</div>

<style>
  div.logo {
    position: relative;
    background-color: transparent;
  }
  div.blue,
  div.green,
  div.red {
    position: absolute;
    width: 75%;
    height: 75%;
    border-radius: 50%;
  }

  div.blue {
    top: 14%;
    right: 0%;
    background-color: var(--ra-blue);
    z-index: 999;
  }

  div.green {
    top: 5%;
    left: 7.5%;
    background-color: var(--ra-green);
    z-index: 666;
  }

  div.red {
    left: 0%;
    bottom: 5%;
    background-color: var(--ra-red);
    z-index: 333;
  }
</style>
