<script>
  // Packages
  import { Meteor } from "meteor/meteor";
  import { onMount } from "svelte";
  import { Session } from "meteor/session";
  import { useSession } from "meteor/rdb:svelte-meteor-data";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  // Collections
  // Modules
  import { ui_translations } from "../client/constants";

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
  function onAnchorClick(anchor) {
    Session.set("target", anchor);
  }

  function capitalizeAndSplit(str) {
    str = str[0].toUpperCase() + str.slice(1);
    str = str.split(/(?=[A-Z])/).join(" ");
    return str;
  }
  function selectLanguage(event) {
    console.log("language event.target.value", event.target.lang);
    Session.set("language", event.target.lang);
  }

  $: language = useSession("language");
</script>

<style>
  nav {
    display: flex;
    margin: 0px;
    position: fixed;
    background-color: var(--ra-white);
    width: 100%;
    top: 0;
  }

  a {
    display: inline-block;
    flex-grow: 1;
    padding: 14px;
    height: 28px;
    text-align: center;
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
    nav a.nav-button {
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

  a.nav-button:hover {
    background-color: var(--ra-grey-off-white);
    color: var(--ra-grey);
    background-size: 100% 4px;
  }
  a.dropdown-button:hover {
    background-color: var(--ra-grey-off-white);
    color: var(--ra-grey);
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
  div.spacer {
    flex-grow: 2;
  }
  div.dropdown {
    flex-grow: 1;
    position: relative;
    display: inline-block;
  }
  a.dropdown-button {
    color: var(--ra-blue);
    padding: 14px;
    font-size: 18px;
    width: 100%;
    border: none;
    cursor: pointer;
  }
  div.dropdown:hover a.dropdown-button:hover {
    color: var(--ra-grey);
  }

  .dropdown-select {
    display: none;
    position: absolute;
    right: 0;
    background-color: var(--ra-grey-off-white);
    min-width: 105px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown:hover .dropdown-select {
    display: block;
  }

  .dropdown-select {
    width: 100%;
    background-color: var(--ra-white);
  }
  .dropdown-select a {
    display: block;
    color: var(--ra-blue);
    padding: 14px;
    width: 100%;
    text-decoration: none;
    align-items: baseline;
    background-color: var(--ra-white);
    border: none;
    cursor: pointer;
  }
  .dropdown-select a:hover {
    background-color: var(--ra-grey-off-white);
    color: var(--ra-grey);
  }
  a.dropdown-option {
    font-size: 18px;
  }
  i {
    font-size: inherit;
  }
</style>

<!-- Direction of the mouse from previous mouseover to current mouseleave determines the class -->
<nav>
  <a
    on:mouseover={over}
    on:mouseout={out}
    on:click={() => onAnchorClick('#commsWithAPlan')}
    href={'#commsWithAPlan'}
    class:active={Session.get('target') == '#commsWithAPlan'}
    class="nav-button {outX - previousOverX > 0 ? 'transition-to-right' : ''}{outX - previousOverX < 0 ? 'transition-to-left' : ''}">
    {capitalizeAndSplit('commsWithAPlan')}
  </a>
  <a
    on:mouseover={over}
    on:mouseout={out}
    on:click={() => onAnchorClick('#consultancy')}
    href={'#consultancy'}
    class:active={Session.get('target') == '#consultancy'}
    class="nav-button {outX - previousOverX > 0 ? 'transition-to-right' : ''}{outX - previousOverX < 0 ? 'transition-to-left' : ''}">
    {capitalizeAndSplit('consultancy')}
  </a>
  <a
    on:mouseover={over}
    on:mouseout={out}
    on:click={() => onAnchorClick('#about')}
    href={'#about'}
    class:active={Session.get('target') == '#about'}
    class="nav-button {outX - previousOverX > 0 ? 'transition-to-right' : ''}{outX - previousOverX < 0 ? 'transition-to-left' : ''}">
    {capitalizeAndSplit('about')}
  </a>
  <a
    on:mouseover={over}
    on:mouseout={out}
    on:click={() => onAnchorClick('#contact')}
    href={'#contact'}
    class:active={Session.get('target') == '#contact'}
    class="nav-button {outX - previousOverX > 0 ? 'transition-to-right' : ''}{outX - previousOverX < 0 ? 'transition-to-left' : ''}">
    {capitalizeAndSplit('contact')}
  </a>
  <div class="spacer" />
  <div class="dropdown">
    <a href={'#'} class="dropdown-button">
      {ui_translations[$language][$language]}
      <i class="material-icons">arrow_drop_down</i>
    </a>

    <div class="dropdown-select">
      <a
        class="dropdown-option"
        href={'#'}
        lang="english"
        on:click|preventDefault={selectLanguage}>
        {ui_translations['english'][$language]}
      </a>
      <a
        class="dropdown-option"
        href={'#'}
        lang="dutch"
        on:click|preventDefault={selectLanguage}>
        {ui_translations['dutch'][$language]}
      </a>
    </div>

  </div>
</nav>
