<script>
  // packages

  // components
  import PageHeader from '../../reusable/PageHeader.svelte';
  import LogoCommsWithAPlan from '../../reusable/LogoCommsWithAPlan.svelte';

  // constants
  import {translations} from '../../../../client/constants';

  // providers
  import UiProvider from '../../../both/uiProvider';

  // content
  import {consultancyItems} from '../../../../client/content';

  // variables
  import {language} from '../../../../client/stores';
  const thisUi = new UiProvider(translations);
</script>

<PageHeader title={'Comms With A Plan'}><LogoCommsWithAPlan size={'3rem'} /></PageHeader>

<section>
  <article>
    <h2>About</h2>
    {#if $language == 'dutch'}
      <p>
        Ik ben Constantijn Baarendse. Ik heb gewerkt op verschillende continenten, voor 'blue chip' adverteerders,
        media- en reclamebureaus.
      </p>
      <p>
        <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
      </p>
    {:else}
      <p>
        I'm Constantijn Baarendse. I've worked on different continents, for blue chip advertisers, media and advertising
        agencies.
      </p>
      <p>
        <a href="https://www.linkedin.com/in/cbaarendse/"> https://www.linkedin.com/in/cbaarendse/ </a>
      </p>
    {/if}
  </article>
</section>

<style>
  section {
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }
</style>
