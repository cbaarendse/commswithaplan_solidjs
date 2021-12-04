<script>
  // packages
  import {useSession} from 'meteor/rdb:svelte-meteor-data';

  // components
  import PageHeader from '../../reusable/PageHeader.svelte';
  import LogoReachApp from '../../reusable/LogoReachApp.svelte';
  import Card from '../../reusable/Card.svelte';

  // variables
  import {language, toolsHomeItems} from '../../../../client/stores';
</script>

<PageHeader title={'Reach'}><LogoReachApp size="3rem" /></PageHeader>

<section>
  <article>
    <Card cardTitle="Tools">
      <span slot="description">
        {#if $language == 'dutch'}
          Comms With A Plan is een Media Management consultancy voor adverteerders.<br />
          Ik initieer, onderhoud en evalueer je media strategie, ik manage je bureaus en budget.
        {:else}
          Comms With A Plan is a Media Management consultancy for advertisers.<br />
          At your service I initiate, maintain and evaluate your media strategy, I manage your agencies and your budget.
        {/if}
      </span>
    </Card>

    <Card cardTitle="ReachApp">
      <span slot="description">
        {#if $language == 'dutch'}
          Comms With A Plan is een flexibele partner in die zin dat het werk per project kan zijn, maar ook meer
          continu. Gebaseerd op vraag. (Bel me zodat ik het kan uitleggen.)
        {:else}
          Comms With A Plan is a flexible unit in the sense that work can be project based, or more continuous, based on
          demand. (Give me a call to explain.)
        {/if}
      </span>
    </Card>
  </article>
</section>

<style>
  section {
    font-size: clamp(var(--font-size-s), var(--font-size-weight) * 100vw, var(--font-size-xl));
  }

  article {
  }
</style>
