<script>
  // Packages
  import { Session } from "meteor/session";
  import { useSession } from "meteor/rdb:svelte-meteor-data";
  import ProjectItem from "./ProjectItem.svelte";

  const processItems = [
    {
      english: {
        name: "Research and analysis",
        description: "Interpretation of past campaigns / years etc."
      },
      dutch: {
        name: "Onderzoek en analyse",
        description: " Interpretatie van afgelopen campagnes / jaren etc."
      }
    },
    {
      english: {
        name: "Briefing",
        description:
          "Instruct the agencies to develop (media) campaigns. Wit the input of former results, all marketing functions, objectives etc. In principle I follow the steps (1) strategy (2) planning (3) execution (4) evaluation & adjust."
      },
      dutch: {
        name: "Briefing",
        description:
          "Opdracht geven aan de bureaus om (media)campagnes te ontwikkelen. Met input van eerdere resultaten, alle marketing functies, doelstellingen etcetera. In principe volg ik de stappen (1) strategie (2) planning (3) uitvoering (4) evaluatie & bijstellen."
      }
    },
    {
      english: {
        name: "Coördination",
        description:
          "I make sure the strategies are integrated. Possibly in a joint development effort by the agencies."
      },
      dutch: {
        name: "Coördinatie",
        description:
          "Ik zorg dat de strategieën geïntegreerd zijn. Eventueel door middel van gezamenlijke ontwikkeling door de bureaus."
      }
    },
    {
      english: {
        name: "Planning",
        description: "Precise elaboration of the strategy by the agencies."
      },
      dutch: {
        name: "Planning",
        description: "Precieze uitwerking van de strategie door de bureaus."
      }
    },
    {
      english: {
        name: "Execution",
        description:
          "Buying, negotiation, implementation, placement by the agencies."
      },
      dutch: {
        name: "Executie",
        description:
          "Inkoop, onderhandeling, implementatie, plaatsing door de bureaus."
      }
    },
    {
      english: {
        name: "Evaluation & adjustment",
        description: "Undertake action based on interim results."
      },
      dutch: {
        name: "Evaluatie & aanpassingen",
        description: "Actie ondernemen op basis van tussenresultaten."
      }
    },
    {
      english: {
        name: "Contracts",
        description: "Arrange yearly agreements with important media parties."
      },
      dutch: {
        name: "Contracten",
        description: "Regelen van jaarafspraken met belangrijke mediapartijen."
      }
    },
    {
      english: {
        name: "Budget management",
        description:
          "Make sure that no one spends more than he/she turns out to have at the end of the year."
      },
      dutch: {
        name: "Budget management",
        description:
          "Ervoor zorgen dat niemand uitgeeft wat hij/zij op het einde van het jaar niet blijkt te hebben."
      }
    },
    {
      english: {
        name: "Creation",
        description:
          "Do I know the difference between indigo, azure, navy or cobalt? No. But I do know whether a proposal is on or off strategy."
      },
      dutch: {
        name: "Creatie",
        description:
          "Weet ik het verschil tussen indigo, azuur, navy en kobalt? Nee. Maar ik weet wel of een voorstel op of naast strategie is."
      }
    },
    {
      english: {
        name: "Agency management",
        description: "Team composition, cost, performance rewarding etc."
      },
      dutch: {
        name: "Bureau management",
        description: "Team samenstelling, kosten, prestatiebeloning etcetera."
      }
    },
    {
      english: {
        name: "Reporting",
        description:
          "Interpret, set up, manage dashboards or other kinds of reports."
      },
      dutch: {
        name: "Rapportage",
        description:
          "Inpreteren, opzetten, managen van dashboards of andersoortige rapporten."
      }
    }
  ];

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
  section#spacer {
    background-image: linear-gradient(to bottom right, LemonChiffon, white);
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
    list-style-type: none;
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
        Ik initieer, onderhoud en evalueer je media strategie, ik manage je
        bureaus en budget.
      </p>
    {:else}
      <p>
        Comms With A Plan is a Media Management consultancy for advertisers.
      </p>
      <p>
        At your service I initiate, maintain and evaluate your media strategy, I
        manage your agencies and your budget.
      </p>
    {/if}
  </article>
</section>
<section id="consultancy">
  <h1>Consultancy</h1>

  <article>
    <h2>Consultancy</h2>
    {#if $language == 'dutch'}
      <p>
        Comms With A Plan is een flexibele partner in die zin dat het werk
        project gebaseerd kan zijn, maar ook meer continu. Gebaseerd op vraag.
        (Bel me zodat ik het kan uitleggen.)
      </p>
    {:else}
      <p>
        Comms With A Plan is a flexible unit in the sense that work can be
        project base, or more continuous, based on demand. (Give me a call to
        explain.)
      </p>
    {/if}
  </article>
  <article>
    <h2>Work</h2>
    <ul>
      {#if $language == 'dutch'}
        <h3>
          Zaken die ik manage gedurende het proces (je kan kiezen en mixen):
        </h3>
      {:else}
        <h3>Things I'll manage along the process (you can pick and mix):</h3>
      {/if}
      {#each processItems as item, index}
        <ProjectItem {item} {index} />
      {/each}
    </ul>
  </article>
</section>
<section id="about">
  <article>
    <h1>About</h1>
    {#if $language == 'dutch'}
      <p>
        Ik ben Constantijn Baarendse. Ik heb gewerkt op verschillende
        continenten, voor 'blue chip' adverteerders, media- en reclamebureaus.
      </p>
      <p>
        Maar dat kun je hier ook allemaal zien:
        <a href="https://www.linkedin.com/in/cbaarendse/">
          https://www.linkedin.com/in/cbaarendse/
        </a>
      </p>
    {:else}
      <p>
        I'm Constantijn Baarendse. I've worked on different continents, for blue
        chip advertisers, media and advertising agencies.
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
