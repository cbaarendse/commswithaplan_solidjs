<script lang="ts">
  // imports
  import Article from './Article.svelte';
  import {language} from '../../stores/utils';
  import {cookiePolicy} from '../../stores/legal';

  // variables
  $: translatedCookiePolicy = $cookiePolicy.filter((item) => item.language === $language);
</script>

{#each translatedCookiePolicy as item}
  <Article {item} />
{/each}
