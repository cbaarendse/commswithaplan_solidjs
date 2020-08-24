<script>
  // Packages
  import { Session } from "meteor/session";
  import { useSession } from "meteor/rdb:svelte-meteor-data";

  $: language = useSession("language");
</script>

<style>
  section {
    padding-top: 56px;
    padding-bottom: 14px;
    background-repeat: no-repeat;
    background-position: top center;
    background-attachment: fixed;
    background-size: cover;
    width: auto;
    min-height: 570px;
  }

  @media only screen and (max-width: 768px) {
    section {
      overflow: hidden;
    }
  }
  section#commsWithAPlan {
    background-image: url("City 920x570.png");
  }
  section#consultancy {
    background-image: url("Family TV old 920x570.png");
  }
  section#about {
    background-image: url("Selfie 920x570.png");
  }
  section#contact {
    background-image: url("Payphone old 920x570.png");
  }
  h1 {
    margin: 0px;
    background-color: yellow;
  }
  h2 {
    margin-left: 1rem;
    color: yellow;
  }
  h3 {
    background-color: white;
  }
  p {
    background-color: white;
    font-size: 1rem;
    margin: 2rem;
    padding: 1rem;
  }
  ul {
    list-style-type: disc;
  }
  li {
    margin: 2rem;
    padding: 1rem;
    background-color: white;
  }
</style>

<section id="commsWithAPlan">
  <article>
    <h1>Comms With A Plan</h1>
    {#if $language == 'dutch'}
      <p>
        Comms With A Plan is een Media Management consultancy voor
        adverteerders.
      </p>
      <p>
        Ik initieer en evalueer je media strategie, ik manage je bureaus en
        budget.
      </p>
    {:else}
      <p>
        Comms With A Plan is a consultancy for advertisers. At your service I
        initiate and evaluate your media strategy, I manage your agencies and
        your budget.
      </p>
    {/if}
  </article>
</section>
<section id="consultancy">
  <h1>Consultancy</h1>
  {#if $language == 'dutch'}
    <article>
      <h2>Consultancy</h2>
      <p>Hello Comms With A Plan</p>
      <p>Hello Comms With A Plan</p>
    </article>
    <article>
      <h2>Work</h2>

      <ul>
        <h3>Things I'll manage along the process:</h3>
        <li>Research and analysis</li>
        <li>Briefing</li>
        <li>Coördination</li>
        <li>Planning</li>
        <li>Execution</li>
        <li>Evaluation & adjustment</li>
        <li>Contracts</li>
        <li>Budget management</li>
        <li>Creation</li>
        <li>Agency management</li>
        <li>Reporting</li>

      </ul>

      <p>Hello Comms With A Plan</p>
    </article>
  {:else}
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
  {/if}
</section>
<section id="about">
  <article>
    <h1>About</h1>
    <p>Hello Comms With A Plan</p>
    <p>Hello Comms With A Plan</p>
  </article>
</section>
<section id="contact">
  <article>
    <h1>Contact</h1>
    <p>mail: cbaarendse@commswithaplan.com</p>
    <p>LinkedIn</p>
  </article>
</section>
<section id="spacer" />
