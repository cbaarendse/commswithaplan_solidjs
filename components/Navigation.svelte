<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  // Direction of mouse when going over navigation links determines classname for link-anchors
  $: previousOverX = 0;
  $: overX = 0;
  $: outX = 0;

  function over(event) {
    previousOverX = overX;
    overX = event.pageX;
  }
  function out(event) {
    outX = event.pageX;
  }
</script>

<style>
  a#show-navigation {
    display: none;
    /* background-color: var(--ra-blue); */
    /* color: var(--ra-white); */
    padding: 14px;
    font-size: 14px;
    border: none;
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
    a#show-navigation {
      display: block;
    }
  }
  a#hide-navigation {
    display: none;
    padding: 14px;
    font-size: 14px;
    border: none;
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    a#hide-navigation {
      display: block;
    }
  }
  nav#navigation-bar {
    margin: 14px 0px;
  }
  @media only screen and (max-width: 768px) {
    nav#navigation-bar {
      display: none;
    }
    nav#navigation-bar:target {
      display: block;
    }
  }
  img {
    height: 100%;
    width: auto;
  }
  a {
    display: inline-block;
    padding: 7px 0px 7px 0px;
    width: 14%;
    height: 28px;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
    font-size: 21px;
    background-image: linear-gradient(var(--ra-green), var(--ra-green));
    background-size: 0% 4px;
    background-repeat: no-repeat;
    background-position: left bottom;
    transition: background-size 0.2s;
    transition-timing-function: ease-out;
  }
  @media only screen and (max-width: 768px) {
    a {
      display: block;
      width: 100%;
    }
  }
  a:link {
    color: var(--ra-blue);
  }
  a.transition-to-right {
    background-position: right bottom;
  }
  a.transition-to-left {
    background-position: left bottom;
  }
  a:visited {
    color: var(--ra-blue);
  }

  a:hover {
    background-color: var(--ra-grey-off-white);
    color: var(--ra-green);
    background-size: 100% 4px;
  }
  a.transition-to-right:hover {
    background-position: left bottom;
  }

  a.transition-to-left:hover {
    background-position: right bottom;
  }
  @keyframes toActive {
    from {
      background-image: linear-gradient(
        var(--ra-grey-off-white),
        var(--ra-grey-off-white)
      );
    }
    to {
      background-image: linear-gradient(
        var(--ra-grey-bright),
        var(--ra-grey-bright)
      );
    }
  }
  a:active {
    animation-name: toActive;
    animation-duration: 1s;
    background-position: bottom;
  }
  a.active {
    color: var(--ra-red);
    background-image: linear-gradient(var(--ra-red), var(--ra-red));
    background-size: 100% 4px;
  }
</style>

<!-- Direction of the mouse from previous mouseover to current mouseleave determines the class -->
<div id="navigation-button">
  <a id="show-navigation" href="#navigation-bar">
    <i class="material-icons">menu</i>
  </a>
</div>

<nav id="navigation-bar">
  <a id="hide-navigation" href="#">
    <i class="material-icons">remove</i>
  </a>
  {#each navigationPaths as { to, displayName }, index}
    <a
      on:mouseover={over}
      on:mouseout={out}
      href={to}
      class:active={to == pathname}
      class="{outX - previousOverX > 0 ? 'transition-to-right' : ''}{outX - previousOverX < 0 ? 'transition-to-left' : ''}">
      {#if index === 0}
        <img src="logo_trans_1024.png" alt="Logo" />
      {:else}{displayName}{/if}
    </a>
  {/each}
</nav>
