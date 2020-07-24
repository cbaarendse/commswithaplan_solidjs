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
    min-height: 900px;
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
  h1 {
    background-color: yellow;
  }
  p {
    background-color: white;
  }
</style>

<section class="commsWithAPlan">
  <article>
    <h1>Comms With A Plan</h1>
    {#if $language == 'english'}
      <p>
        Hello Comms With A Plan is a consultancy for advertisers. We initiate
        and evaluate your marketing communications strategy, we manage your
        agencies and your budget.
      </p>
    {/if}
    <p>Hello Comms With A Plan</p>
  </article>
</section>
<section class="consultancy">
  <h1>Consultancy</h1>
  <article>
    <h2>Consultancy</h2>
    <p>Hello Comms With A Plan</p>
    <p>Hello Comms With A Plan</p>
  </article>
  <article>
    <h2>Consultancy</h2>
    <p>Hello Comms With A Plan</p>
    <p>Hello Comms With A Plan</p>
  </article>
</section>
<section class="about">
  <article>
    <h1>About</h1>
    <p>Hello Comms With A Plan</p>
    <p>Hello Comms With A Plan</p>
  </article>
</section>
<section class="contact">
  <article>
    <h1>Contact</h1>
    <p>Hello Comms With A Plan</p>
    <p>Hello Comms With A Plan</p>
  </article>
</section>
