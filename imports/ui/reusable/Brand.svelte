<script lang="ts">
  // types
  import {Brand} from '/types/interfaces';

  // variables
  export let brand: Brand;
  brand.color = 'blue';
  brand.fontSize = 'fs_2xl';
  brand.title = 'Comms With A Plan';
  brand.className = [brand.color, brand.fontSize].join(' ');
</script>

<div class="brand">
  <slot />
  <span class={brand.className}>{brand.title}</span>
</div>

<style>
  .brand {
    align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.7em;
    align-items: center;
    font-family: 'Trebuchet MS';
  }
  .blue {
    color: var(--ra-blue);
  }
  .green {
    color: var(--ra-green);
  }
  .red {
    color: var(--ra-red);
  }
  .teal {
    color: var(--ra-teal);
  }
  .grey {
    color: var(--ra-grey);
  }

  .fs_xxs {
    font-size: var(--font-size-xxs);
  }
  .fs_xs {
    font-size: var(--font-size-xs);
  }
  .fs_s {
    font-size: var(--font-size-s);
  }
  .fs_m {
    font-size: var(--font-size-m);
  }
  .fs_l {
    font-size: var(--font-size-l);
  }
  .fs_xl {
    font-size: var(--font-size-xl);
  }
  .fs_2xl {
    font-size: var(--font-size-2xl);
  }
  .fs_3xl {
    font-size: var(--font-size-3xl);
  }
  .fs_4xl {
    font-size: var(--font-size-4xl);
  }
  .fs_5xl {
    font-size: var(--font-size-5xl);
  }
  .fs_6xl {
    font-size: var(--font-size-6xl);
  }
  .fs_7xl {
    font-size: var(--font-size-7xl);
  }
  .fs_8xl {
    font-size: var(--font-size-8xl);
  }
</style>
