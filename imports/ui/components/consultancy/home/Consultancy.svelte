<script lang="ts">
  // imports
  import BreadCrumbs from '../../reusable/BreadCrumbs.svelte';
  import CardCopy from '../../reusable/CardCopy.svelte';
  import {language} from '../../../stores/utils';
  import {consultancyHomeItems} from '../../../stores/consultancy';
  import createConverter from '/imports/ui/functions/convert';

  // variables
  const converter = createConverter();
  $: expandedConsultancyHomeItems = converter.expandItems<
    (typeof $consultancyHomeItems)[number],
    (typeof $consultancyHomeItems)[number]['definitions'][0]
  >($consultancyHomeItems, $language);
</script>

<BreadCrumbs />
<section>
  <div class="home__flex">
    {#each expandedConsultancyHomeItems as item}
      <CardCopy
        let:Title
        let:Action
        let:Body
        card={{
          color: 'blue',
          fontSize: '0.9em'
        }}
      >
        <Title>{item.displayName}</Title>
        <!-- @html because of <mark></mark> tags in text -->
        <Body>{@html item.description}</Body>
        <Action link={item.link}>{item.action}</Action>
      </CardCopy>
    {/each}
  </div>
</section>

<style>
  .home__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  .home__flex :global(.card) {
    flex: 1 1 32rem;
  }
</style>
