<script>
  // packages
  import {slide} from 'svelte/transition';
  import {quintOut} from 'svelte/easing';

  import Icon from 'svelte-awesome';
  import {faMenu, faHyphen} from '@fortawesome/free-regular-svg-icons';

  // components
  import Button from '../reusable/Button.svelte';

  // variables
  let display = 'none';
  console.log('display', display);

  // functions
  const toggleDisplay = (event) => {
    console.log('toggleDisplay', display, event.detail);
    display === 'none' ? (display = 'block') : (display = 'none');
  };
</script>

<div class="accordion-top">
  <Button size="normal" backgroundColor={'transparantnoborder'} type={'button'} on:click={() => toggleDisplay}
    >{#if display === 'none'}&#43;
    {:else}&#8213;{/if}
  </Button>
  <slot name="title" />
</div>
{#if display === 'block'}
  <div class="accordion-bottom" transition:slide={{delay: 250, duration: 300, easing: quintOut}}><h4><slot /></h4></div>
{/if}

<style>
  div {
    border: 1px dashed var(--ra-grey);
    padding: 1em 2em;
    width: 100%;
    height: fit-content;
  }
  div.accordion-top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>
