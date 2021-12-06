<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  import PageHeader from '../../reusable/Brand.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, toolsHomeItems} from '../../../../client/stores';
</script>

<PageHeader title={'Reach'}><LogoReachApp size="3rem" /></PageHeader>

<section>
  <article>
    {#each $toolsHomeItems as item, index}
      <Card cardTitle={item[$language].displayName}>
        <span>
          {item[$language].description}
        </span>
      </Card>
    {/each}
  </article>
</section>

<style>
  section {
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  article {
  }
</style>
