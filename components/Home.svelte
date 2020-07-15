<script>
  // Packages
  import { Session } from "meteor/session";
  import { useSession } from "meteor/rdb:svelte-meteor-data";

  $: language = useSession("language");
</script>

<style>
  section {
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    width: auto;
  }
  section.commsWithAPlan {
    background-image: url("City 920x570.png");
  }
  section.consultancy {
    background-image: url("Family TV old 920x570.png");
  }
  section.about {
    background-image: url("Selfie 920x570.png");
  }
  section.contact {
    background-image: url("Payphone old 920x570.png");
  }
</style>

<section class="commsWithAPlan">
  <h1>Comms With A Plan</h1>
  {#if $language == 'english'}
    <p>
      Hello Comms With A Plan is a consultancy for advertisers. We initiate and
      evaluate your marketing communications strategy, we manage your agencies
      and your budget.
    </p>
  {/if}
</section>
<section class="consultancy">
  <h1>Consultancy</h1>
</section>
<section class="about">
  <h1>About</h1>
</section>
<section class="contact">
  <h1>Contact</h1>
</section>
