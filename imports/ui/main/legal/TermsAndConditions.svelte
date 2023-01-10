<script lang="ts">
  // imports
  import PolicyArticle from './PolicyArticle.svelte';
  import {language} from '../../stores/utils';
  import {termsAndConditions} from '../../stores/legal';

  // variables
  $: translatedTermsAndsConditions = $termsAndConditions.filter((item) => item.language === $language);
</script>

{#each translatedTermsAndsConditions as item}
  <PolicyArticle {item} />
{/each}
