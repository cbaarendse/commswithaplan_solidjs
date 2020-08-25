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
    margin: 1rem;
    color: yellow;
  }
  h3 {
    margin: 1rem;
    padding: 0rem 1rem;
    width: fit-content;
    background-color: white;
  }
  p {
    font-size: 21px;
    margin: 28px;
    padding: 14px;
    width: fit-content;
    background-color: white;
  }
  ul {
    list-style-type: square;
  }
  li {
    margin: 28px;
    padding: 14px;
    background-color: white;
    width: fit-content;
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
        Comms With A Plan is a Media Management consultancy for advertisers.
      </p>
      <p>
        At your service I initiate and evaluate your media strategy, I manage
        your agencies and your budget.
      </p>
    {/if}
  </article>
</section>
<section id="consultancy">
  <h1>Consultancy</h1>
  {#if $language == 'dutch'}
    <article>
      <h2>Consultancy</h2>
      <p>
        Comms With A Plan is a flexible unit in the sense that work can be
        project base, or more continuous, based on demand. (Give me a call to
        explain.)
      </p>
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

    </article>
  {:else}
    <article>
      <h2>Consultancy</h2>
      <p>
        Comms With A Plan is a flexible unit in the sense that work can be
        project base, or more continuous, based on demand. (Give me a call to
        explain.)
      </p>
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

    </article>
  {/if}
</section>
<section id="about">
  <article>
    <h1>About</h1>
    {#if $language == 'dutch'}
      <p>
        Ik ben Constantijn Baarendse.Ik werk in marketing communicatie sinds ik
        ben begonnen, in een mediabureau.
        <br />
        Ik heb sindsdien gewerkt op verschillende continenten, voor 'blue chip'
        bureaus en adverteerders.
      </p>
      <p>
        Maar dat kun je hier ook allemaal zien:
        <a href="https://www.linkedin.com/in/cbaarendse/">
          https://www.linkedin.com/in/cbaarendse/
        </a>
      </p>
    {:else}
      <p>
        I'm Constantijn Baarendse. I'm working in marketing communications ever
        since I started out, working for a media agency.
        <br />
        I've worked on different continents since, for blue chip agencies and
        advertisers.
      </p>
      <p>
        But you'll see all that here as well:
        <a href="https://www.linkedin.com/in/cbaarendse/">
          https://www.linkedin.com/in/cbaarendse/
        </a>
      </p>
    {/if}
  </article>
</section>
<section id="contact">
  <article>
    <h1>Contact</h1>
    {#if $language == 'dutch'}
      <p>e-mail: cbaarendse@commswithaplan.com</p>
      <p>telefoon: nul zes een twee drie negen acht zeven drie vier</p>
    {:else}
      <p>e-mail: cbaarendse@commswithaplan.com</p>
      <p>
        telephone: plus three one six one two three nine eight seven three four
      </p>
    {/if}
  </article>
</section>
<section id="spacer" />
