<script>
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { Session } from "meteor/session";

  let anchorNames = ["commsWithAPlan", "consultancy", "about", "contact"];
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
  function onAnchorClick(anchorName) {
    let anchor = "#" + anchorName;
    Session.set("target", anchor);
  }

  function capitalizeAndSplit(str) {
    str = str[0].toUpperCase() + str.slice(1);
    str = str.split(/(?=[A-Z])/).join(" ");
    return str;
  }
</script>

<style>
  nav#navigation-bar {
    margin: 14px 0px;
    position: fixed;
    background-color: var(--ra-white);
    top: 0;
  }
  @media only screen and (max-width: 768px) {
    nav#navigation-bar {
      display: none;
    }
    nav#navigation-bar:target {
      display: block;
    }
  }
  a {
    float: left;
    display: block;
    padding: 7px 0px 7px 0px;
    width: 18%;
    height: 28px;
    text-align: center;
    /* vertical-align: middle; */
    text-decoration: none;
    font-size: 21px;
    background-image: linear-gradient(
      var(--ra-grey-bright),
      var(--ra-grey-bright)
    );
    background-size: 0% 4px;
    background-repeat: no-repeat;
    background-position: left bottom;
    transition: background-size 0.2s;
    transition-timing-function: ease-out;
  }
  @media only screen and (max-width: 768px) {
    a {
      display: none;
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
    color: var(--ra-grey);
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
<nav id="navigation-bar">
  {#each anchorNames as anchorName, index}
    <a
      on:mouseover={over}
      on:mouseout={out}
      on:click={() => onAnchorClick(anchorName)}
      href={'#' + anchorName}
      class:active={Session.get('target') == '#' + anchorName}
      class="{outX - previousOverX > 0 ? 'transition-to-right' : ''}{outX - previousOverX < 0 ? 'transition-to-left' : ''}">
      {capitalizeAndSplit(anchorName)}
    </a>
  {/each}
</nav>
