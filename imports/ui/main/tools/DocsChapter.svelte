<script>
  // components
  import {faParagraph} from '@fortawesome/free-solid-svg-icons';
  import DocsParagraph from './DocsParagraph.svelte';
  import {language} from '../../../../client/stores';
  // variables
  export let chapter;
  export let name;
  export let img;
</script>

<div id={name}>
  <h3>{chapter[$language].title}</h3>
  <ul>
    {#each chapter[$language].content as paragraph}
      <li>
        <DocsParagraph subtitle={paragraph.subtitle} text={paragraph.text} example={paragraph.example} />
      </li>
    {/each}
  </ul>
  <picture>
    <img src="/documentation{img}" alt={name} />
  </picture>
</div>

<style>
  ul {
    list-style-type: none;
  }
</style>
