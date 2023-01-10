<script lang="ts">
  // imports
  import PolicyArticle from './PolicyArticle.svelte';
  import {language} from '../../stores/utils';
  import {cookiePolicy} from '../../stores/legal';

  // variables
  $: translatedCookiePolicy = $cookiePolicy.filter((item) => item.language === $language);
</script>

{#each translatedCookiePolicy as item}
  <PolicyArticle {item} />
{/each}
