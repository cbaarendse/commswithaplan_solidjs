<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {contactItems} from '../../stores/consultancy';
  import {claim_element} from 'svelte/internal';

  // variables
  $: translatedContactItems = $contactItems.filter((item) => item.language === $language);
</script>

<BreadCrumbs />
<section>
  <div class="contact__flex">
    {#each translatedContactItems as item}
      <Card card={{color: 'blue', title: item.displayName, sizes: '1em'}}>
        <address>
          {item.description}
        </address>
      </Card>
    {/each}
    <Card
      card={{
        title: 'LinkedIn',
        color: 'blue',
        sizes: '1em',
        link: 'https://www.linkedin.com/in/cbaarendse/',
        action: 'LinkedIn'
      }}
    >
      <address>
        <a href="https://www.linkedin.com/in/cbaarendse/"><b>In</b></a>
      </address>
    </Card>
    <Card card={{title: 'LinkedIn Profiel'}}
      ><div
        class="badge-base LI-profile-badge"
        data-locale="nl_NL"
        data-size="large"
        data-theme="light"
        data-type="VERTICAL"
        data-vanity="cbaarendse"
        data-version="v1"
      >
        <a class="badge-base__link LI-simple-link" href="https://nl.linkedin.com/in/cbaarendse/nl?trk=profile-badge"
          >Constantijn Baarendse</a
        >
      </div>
    </Card>
  </div>
  <h4>
    {#if $language == 'dutch'}
      E-mail, bel, schrijf of stuur een bericht via LinkedIn.
    {:else}
      E-mail, claim_element, write or send a message through LinkedIn.
    {/if}
  </h4>
</section>

<style>
  h4 {
    color: var(--ra-red);
  }
  .contact__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  .contact__flex :global(.card) {
    flex: 1 1 32rem;
  }
</style>
