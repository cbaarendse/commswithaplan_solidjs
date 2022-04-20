<script lang="ts">
  // packages

  // components
  import Main from './layout/Main.svelte';
  import Header from './layout/Header.svelte';
  import Section from './layout/Section.svelte';
  import Brand from '../../reusable/Brand.svelte';

  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';

  // variables
  import {language} from '../../stores/stores';
</script>

<Main>
  <Section>
    <div class="cookie_policy__flex">
      <Header>
        <Brand
          brand={{
            title: `${$language === 'dutch' ? 'Cookie Beleid' : 'Cookie Policy'}`,
            color: 'var(--ra-blue)',
            fontSize: 'var(--ra-fs-2xl)'
          }}
          ><LogoCommsWithAPlan
            logo={{
              fontSize: 'var(--ra-fs-5xl)',
              width: 'var(--ra-5xl)',
              height: 'var(--ra-5xl)',
              minWidth: 'var(--ra-5xl)',
              minHeight: 'var(--ra-fxl)',
              colored: true
            }}
          /></Brand
        >
      </Header>
      <article>
        <h1>
          {$language === 'dutch' ? 'Advertenties' : 'Ads'}
        </h1>
        {#if $language === 'dutch'}<p>
            Tracking cookies van onze adverteerders Met jouw toestemming plaatsen onze adverteerders zogenaamde tracking
            cookies op jouw apparatuur. Deze cookies gebruiken zij om bij te houden welke pagina’s je bezoekt uit hun
            netwerk, om zo een profiel op te bouwen van jouw online surfgedrag. Dit profiel wordt mede opgebouwd op
            basis van vergelijkbare informatie die zij van jouw bezoek aan andere websites uit hun netwerk krijgen. Dit
            profiel wordt niet gekoppeld aan jouw naam, adres, e-mailadres en dergelijke zoals bij ons bekend, maar
            dient alleen om advertenties af te stemmen op jouw interesses zodat deze zo veel mogelijk relevant voor je
            zijn.
          </p>{:else}<p>'English text'</p>{/if}
      </article>
      <article>
        <h1>{$language === 'dutch' ? 'Analyses' : 'Analytics'}</h1>
        {#if $language === 'dutch'}<p>
            <strong>Google Analytics:</strong> Via onze website wordt een cookie geplaatst van het Amerikaanse bedrijf Google,
            als deel van de “Analytics”-dienst. Wij gebruiken deze dienst om bij te houden en rapportages te krijgen over
            hoe bezoekers de website gebruiken. Google kan deze informatie aan derden verschaffen indien Google hiertoe wettelijk
            wordt verplicht, of voor zover derden de informatie namens Google verwerken. Wij hebben hier geen invloed op.
            Wij hebben Google wel/niet toegestaan de verkregen analytics informatie te gebruiken voor andere Google-diensten.
          </p>
          <p>
            De informatie die Google verzamelt wordt zo veel mogelijk geanonimiseerd. Uw IP-adres wordt nadrukkelijk
            niet meegegeven. De informatie wordt overgebracht naar en door Google opgeslagen op servers in de Verenigde
            Staten. Standard Contractual Clauses zijn daarom onderdeel van de voorwaarden van Google.”
          </p>{:else}<p>'English text'</p>{/if}
      </article>
      <article>
        <h1>{$language === 'dutch' ? 'Functioneel' : 'Functional'}</h1>
        {#if $language === 'dutch'}<p>
            Gebruik van permanente cookies Met behulp van een permanente cookie kunnen wij jou herkennen bij een nieuw
            bezoek op onze website. De website kan daardoor speciaal op jouw voorkeuren worden ingesteld. Ook wanneer je
            toestemming hebt gegeven voor het plaatsen van cookies kunnen wij dit door middel van een cookie onthouden.
            Hierdoor hoef je niet steeds jouw voorkeuren te herhalen waardoor je dus tijd bespaart en een prettiger
            gebruik van onze website kunt maken. Permanente cookies kan je verwijderen via de instellingen van jouw
            browser.
          </p>{:else}<p>'English text'</p>{/if}
      </article>
      <article>
        <h1>{$language === 'dutch' ? 'Persoonlijk' : 'Personal'}</h1>
        {#if $language === 'dutch'}<p>'Dutch text'</p>{:else}<p>'English text'</p>{/if}
      </article>
      <article>
        <h1>{$language === 'dutch' ? 'Veiligheid' : 'Security'}</h1>
        {#if $language === 'dutch'}<p>'Dutch text'</p>{:else}<p>'English text'</p>{/if}
      </article>
    </div>
  </Section>
</Main>

<style>
  .cookie_policy__flex {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .cookie_policy__flex :global(header) {
    flex: 0 1 100%;
  }
  .cookie_policy__flex :global(.card) {
    flex: 1 1 320px;
  }
</style>
