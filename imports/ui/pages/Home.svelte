<script>
  import Main from '../components/reusable/Main.svelte';
  import Section from '../components/reusable/Section.svelte';
  import Article from '../components/reusable/Article.svelte';
  import Card from '../components/reusable/Card.svelte';

  // variables
  export let language;
</script>

<Main>
  <Section sectionTitle={'Comms With A Plan'} titleColor={'Plum'} height={'10em'} />
  <Section>
    <Article>
      <Card backgroundColor={'DarkSeaGreen'} color={'LightGreen'} cardTitle={'Comms With A Plan'}
        ><p slot="cardContent">Comms With A Plan provides Media Management consultancy. Read more...</p></Card
      >
    </Article>
    <Article>
      <Card backgroundColor={'LightBlue'} color={'White'} cardTitle={'Schema'}
        ><p slot="cardContent">All your campaigns in one place with Schedule. Read more...</p></Card
      >
    </Article>
    <Article>
      <Card backgroundColor={'DarkSalmon'} color={'var(--ra-red)'} cardTitle={'Bereik'}
        ><p slot="cardContent">A handy tool to estimate your total reach. Read more...</p></Card
      >
    </Article>
  </Section>
  <Section />
</Main>

<style>
</style>
