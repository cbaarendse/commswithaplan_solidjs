<script lang="ts">
  // imports
  import Section from '../../reusable/Section.svelte';
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import Card from '../../reusable/Card.svelte';
  import {language} from '../../stores/utils';
  import {contactItems} from '../../stores/consultancy';

  // variables
  $: translatedContactItems = $contactItems.filter((item) => item.language === $language);
</script>

<BreadCrumbs breadCrumbs={['consultancy']} />
<Section>
  <div class="contact__flex">
    {#each translatedContactItems as item}
      <Card card={{color: 'blue', title: item.displayName}}>
        <address>
          {item.description}
        </address>
      </Card>
    {/each}
    <Card
      card={{
        title: 'LinkedIn',
        color: 'blue',
        link: 'https://www.linkedin.com/in/cbaarendse/',
        action: 'LinkedIn'
      }}
    >
      <address>
        <a href="https://www.linkedin.com/in/cbaarendse/"><b>In</b></a>
      </address>
    </Card>
  </div>
  <span
    >{#if $language == 'dutch'}
      Bel me of schrijf.
    {:else}
      Give me a call or write.
    {/if}
  </span>
</Section>

<style>
  span {
    color: var(--ra-red);
  }
  .contact__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .contact__flex :global(.card) {
    flex: 1 1 320px;
  }
</style>
