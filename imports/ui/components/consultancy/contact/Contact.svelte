<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../../stores/utils';
  import {contactItems} from '../../../stores/consultancy';

  // variables
  $: translatedContactItems = $contactItems.filter((item) => item.language === $language);
</script>

<BreadCrumbs />
<section>
  <div class="contact__flex">
    {#each translatedContactItems as item}
      <Card card={{color: 'blue', title: item.displayName, fontSize: '0.9em'}}>
        <address>
          <!-- @html because of new lines in address items (phne number, home address) -->
          {@html item.description.split(', ').join('<br>')}
        </address>
      </Card>
    {/each}
    <Card
      card={{
        title: 'LinkedIn',
        color: 'blue',
        fontSize: '1em',
        link: 'https://www.linkedin.com/in/cbaarendse/',
        action: 'Constantijn Baarendse'
      }}
    />
  </div>
  <h5>
    {#if $language == 'dutch'}
      E-mail, bel, schrijf of stuur een bericht via LinkedIn.
    {:else}
      E-mail, call, write or send a message through LinkedIn.
    {/if}
  </h5>
</section>

<style>
  h5 {
    color: var(--ra-red);
  }
  .contact__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  .contact__flex :global(.card) {
    flex: 1 1 30rem;
  }
</style>
