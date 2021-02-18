<script>
  // Packages
  import { Session } from "meteor/session";
  import { useSession } from "meteor/rdb:svelte-meteor-data";
  // Variables
  export let item;
  export let index;
  let visibility = false;
  // Functions
  function toggleVisibility() {
    console.log("toggleVisibility executed, visibility = ", visibility);
    return visibility == false
      ? (visibility = true)
      : visibility == true
      ? (visibility = false)
      : (visibility = false);
  }
  $: language = useSession("language");
</script>

<style>
  li {
    margin: 21px;
    height: fit-content;
  }
  button {
    margin-right: 4px;
    padding: 14px;
    background-color: white;
    width: fit-content;
    font-size: 21px;
    box-shadow: 4px 4px dimgrey;
    cursor: pointer;
    border: none;
    transition: background-color 0.5s;
  }
  button:hover {
    color: yellow;
    background-color: var(--ra-grey-bright);
    box-shadow: 2px 2px dimgrey;
  }
  span {
    margin-bottom: 7px;
    padding: 14px;
    background-color: white;
    width: fit-content;
    line-height: 3.5;
    font-size: 21px;
  }
</style>

<li>
  <button
    value={'description' + index}
    on:mouseenter|preventDefault={toggleVisibility}
    on:mouseleave|preventDefault={toggleVisibility}>
    {item[$language].name}
  </button>
  <span
    id={'description' + index}
    style={visibility == true ? 'visibility:visible;' : 'visibility:hidden;'}>
    {item[$language].description}
  </span>
</li>
