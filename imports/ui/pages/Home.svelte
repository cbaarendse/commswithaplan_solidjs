<script>
  import Section from '../components/reusable/Section.svelte';
  import Article from '../components/reusable/Article.svelte';
  import Card from '../components/reusable/Card.svelte';

  // variables
  export let language;
</script>

<main>
  <Section sectionTitle={'Comms With A Plan'} titleColor={'Plum'}
    ><Article>Media hulp bij marketing communicatie</Article><Article>
      Media hulp bij marketing communicatie</Article
    ><Article>Media hulp bij marketing communicatie</Article><Article>
      Media hulp bij marketing communicatie</Article
    ><Article>Media hulp bij marketing communicatie</Article></Section
  >
  <Section>
    <Article
      ><Card
        backgroundColor={'DarkSeaGreen'}
        color={'LightGreen'}
        cardTitle={'Comms With A Plan'}
        cardLink={'/commswithaplan'}
        cardLinkText={'Read more...'}>Comms With A Plan provides Media Management consultancy.</Card
      ></Article
    >
    <Article>
      <Card
        backgroundColor={'DarkSalmon'}
        color={'var(--ra-red)'}
        cardTitle={'Bereik'}
        cardLink={'/reach'}
        cardLinkText={'Read more...'}>A handy tool to estimate your total reach.</Card
      >
    </Article>
    <Article>
      <Card
        backgroundColor={'LightBlue'}
        color={'White'}
        cardTitle={'Schema'}
        cardLink={'/schedule'}
        cardLinkText={'Read more...'}>All your campaigns in one place with Schedule.</Card
      >
    </Article>
  </Section>
  <Section />
</main>

<style>
</style>
