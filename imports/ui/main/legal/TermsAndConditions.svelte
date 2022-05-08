<script lang="ts">
  // imports
  import Article from './layout/Article.svelte';
  import {language} from '../../stores/utils';
  import {termsAndConditions} from '../../stores/legal';

  // variables
  $: translatedTermsAndsConditions = $termsAndConditions.filter((item) => item.language === $language);
</script>

{#each translatedTermsAndsConditions as item}
  <Article {item} />
{/each}
