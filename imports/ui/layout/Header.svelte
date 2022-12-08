<script lang="ts">
  // imports
  import {isSmallScreen, useMediaQuery} from '../stores/utils';

  // variables

  // functions
  useMediaQuery('(max-width: 759px)').subscribe((value: boolean | null): void => {
    $isSmallScreen = value;
  });
</script>

<header>
  <slot />
</header>

<style>
  header {
    font-size: 1.6em;
    width: 100%;
    z-index: 999;
    margin-bottom: 2em;
  }
</style>
