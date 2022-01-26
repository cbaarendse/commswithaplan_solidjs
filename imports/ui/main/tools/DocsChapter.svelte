<script lang="ts">
  // components
  import DocsParagraph from './DocsParagraph.svelte';
  import {language} from '../../../../client/stores';
  // variables
  export let chapter: any;
  export let name: string;
  export let img: string;
</script>

<div>
  <h3>&sect;&nbsp;{chapter[$language].title}</h3>
  <ul>
    {#each chapter[$language].content as paragraph}
      <li>
        <DocsParagraph subtitle={paragraph.subtitle} text={paragraph.text} elaboration={paragraph.elaboration} />
      </li>
    {/each}
  </ul>
  <picture>
    <img src="/documentation{img}" alt={name} />
  </picture>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  ul {
    list-style-type: none;
  }
  img {
    max-width: 300px;
  }
</style>
