<script lang="ts">
  // imports
  import ToggleButton from './ToggleButton.svelte';
  import {language} from '../stores/utils';
</script>

<!-- TopBar has room for functionality used from all over the site. Eventual cookies and/or marketing messages. -->
<!-- TODO: language buttons in <menu> then top = flex, pspace in between -->
<div class="top" role="menu">
  <ul>
    <li>
      <ToggleButton />
    </li>
    <li>
      <a
        href={'javascript:void(0)'}
        class:active={$language === 'dutch'}
        on:click={() => ($language = 'dutch')}
        data-tinro-ignore><span>NL</span></a
      >
    </li>
    <span class="divider">|</span>
    <li>
      <a
        href={'javascript:void(0)'}
        class:active={$language === 'english'}
        on:click={() => ($language = 'english')}
        data-tinro-ignore><span>EN</span></a
      >
    </li>
    <li>
      <div class="user">&#128100</div>
    </li>
  </ul>
</div>

<style>
  .top ul {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 0.8rem;
    background-color: var(--ra-grey-off-white);
  }

  .top ul li:first-of-type {
    flex: 1 1 0;
  }

  @media screen and (min-width: 760px) {
    .top ul li:first-of-type {
      display: none;
    }
  }
  .top ul li:after {
    content: '|';
    color: var(--ra-grey-light);
    position: absolute;
    right: 0;
    top: 34%;
  }

  .top ul li:first-of-type:after,
  .top ul li:last-of-type:after {
    content: none;
  }

  .top .user {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* :link, :visited */
  .top a,
  .top a:visited {
    color: var(--ra-grey-light);
  }

  .top a:hover {
    color: var(--ra-blue-bright);
  }

  .top a.active span {
    color: var(--ra-blue);
  }
</style>
