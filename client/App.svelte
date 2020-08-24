<script>
  // Packages
  import { Meteor } from "meteor/meteor";
  import { onMount } from "svelte";
  // Collections
  // Components
  import Navigation from "../components/Navigation.svelte";
  import Home from "../components/Home.svelte";
  import Footer from "../components/Footer.svelte";
  import NotFound from "../components/NotFound.svelte";

  onMount(async () => {
    console.log("App is mounted");
  });
</script>

<style>

</style>

<Navigation />
<Home />
<Footer />
