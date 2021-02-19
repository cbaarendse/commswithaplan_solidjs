<script>
  import Main from '../components/reusable/Main.svelte';
  import Section from '../components/reusable/Section.svelte';
  import Card from '../components/reusable/Card.svelte';

  // variables
  export let language;
</script>

<Main>
  <Section>
    <div class="grid">
      <div class="item">
        <Card backgroundColor={'DarkSeaGreen'} color={'LightGreen'} cardTitle={'Comms With A Plan'}
          ><p slot="cardContent">Comms With A Plan provides Media Management consultancy. Read more...</p></Card
        >
      </div>
      <div class="item">
        <Card backgroundColor={'LightBlue'} color={'White'} cardTitle={'Schema'}
          ><p slot="cardContent">All your campaigns in one place with Schedule. Read more...</p></Card
        >
      </div>
      <div class="item">
        <Card backgroundColor={'DarkSalmon'} color={'var(--ra-red)'} cardTitle={'Bereik'}
          ><p slot="cardContent">A handy tool to estimate your total reach. Read more...</p></Card
        >
      </div>
    </div>
  </Section>
</Main>

<style>
  div.grid {
    width: 60%;
    margin: auto;
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    row-gap: 21px;
    column-gap: 21px;
    justify-content: space-evenly;
    background-color: beige;
  }

  div.item {
    background-color: skyblue;
  }
</style>
