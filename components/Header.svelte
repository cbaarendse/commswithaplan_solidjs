<script>
  // Packages
  import { Meteor } from "meteor/meteor";
  import { onMount } from "svelte";
  import { Session } from "meteor/session";
  // Collections
  // Modules
  import { ui_translations } from "../client/constants";

  onMount(async () => {
    console.log("Header is mounted");
  });

  function selectLanguage(event) {
    Session.set("language", event.target.value);
  }
  $: language = Session.get("language");
</script>

<style>
  header {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    padding: 0px;
  }
  div.dropdown {
    position: relative;
    display: inline-block;
  }
  button.dropdown-button {
    background-color: var(--ra-blue);
    color: white;
    padding: 14px;
    font-size: 14px;
    min-width: 105px;
    border: none;
    cursor: pointer;
  }
  div.dropdown:hover button.dropdown-button {
    background-color: var(--ra-green);
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: var(--ra-grey-off-white);
    min-width: 105px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-content {
    width: 100%;
    background-color: var(--ra-white);
  }
  .dropdown-content button {
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
  .dropdown-content button:hover {
    background-color: var(--ra-grey-off-white);
    color: var(--ra-green);
  }
  i {
    font-size: inherit;
  }
</style>

<header>
  <div class="dropdown">
    <button class="dropdown-button">
      {ui_translations[$language][$language]}
      <i class="material-icons">arrow_drop_down</i>

    </button>

    <div class="dropdown-content">
      <button value="english" on:click={selectLanguage}>
        {ui_translations['english'][$language]}
      </button>
      <button value="dutch" on:click={selectLanguage}>
        {ui_translations['dutch'][$language]}
      </button>
    </div>
  </div>
</header>
