<script lang="ts">
  // imports
  import Image from './CardImage.svelte';
  import Title from './CardTitle.svelte';
  import Body from './CardBody.svelte';
  import Footer from './CardFooter.svelte';
  import Action from './CardAction.svelte';

  // types
  import type {Card} from '../../../both/typings/types';

  // variables
  export let card: Card;
  export let imgFiles: string[];
  export let title: string;
  export let link: string;
</script>

<article
  class="card"
  style="background-color:{card.backgroundColor}; font-color:{card.color}; font-size:{card.fontSize}"
>
  <Image {imgFiles} {title} />
  <Title />
  <Body />
  <Footer />
  <Action {link} />
</article>

<style>
  article.card {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8em;
    padding: 0.7em;
    box-shadow: 0.1em 0.1em 0.2em 0 rgba(0, 0, 0, 0.1);
  }
</style>
