<script lang="ts">
</script>

<div class="spinner">
  <div class="circle1" />
  <div class="circle2" />
  <div class="circle3" />
</div>

<style>
  div.spinner {
    border: solid 2px var(--ra-red);
    position: relative;
    width: 4rem;
    height: 4rem;
    background-color: transparent;
    animation-name: transform;
    animation-duration: 1s;
    animation-delay: 0.2s;
    animation-iteration-count: infinite;
    animation-direction: normal;
    /* animation-timing-function */
    /* animation-fill-mode */
    transform: rotate(360deg);
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
    z-index: 50;
    background-color: var(--ra-blue);
  }

  div.circle2 {
    top: 5%;
    left: 7.5%;
    z-index: 40;
    background-color: var(--ra-green);
  }

  div.circle3 {
    left: 0%;
    bottom: 5%;
    z-index: 30;
    background-color: var(--ra-red);
  }
</style>
