<script lang="ts">
  // imports
  import Image from './CardImage.svelte';
  import Title from './CardTitle.svelte';
  import Body from './CardBody.svelte';
  import Action from './CardAction.svelte';
  import Footer from './CardFooter.svelte';
  // types

  // variables
  export let backgroundColor: CSSStyleDeclaration['backgroundColor'];
  export let color: CSSStyleDeclaration['color'];
  export let fontSize: CSSStyleDeclaration['fontSize'];
  const C = {Image, Title, Body, Action, Footer};
</script>

<article class="card" style="background-color:{backgroundColor}; font-color:{color}; font-size:{fontSize}">
  <slot {C} />
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
