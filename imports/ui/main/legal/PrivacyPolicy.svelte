<script lang="ts">
  // imports
  import Article from './Article.svelte';
  import {language} from '../../stores/utils';
  import {privacyPolicy} from '../../stores/legal';

  // variables
  $: translatedPrivacyPolicy = $privacyPolicy.filter((item) => item.language === $language);
</script>

{#each translatedPrivacyPolicy as item}
  <Article {item} />
{/each}
