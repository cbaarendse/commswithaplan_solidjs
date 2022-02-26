<script lang="ts">
  // packages
  import ToggleButton from './ToggleButton.svelte';

  // variables
  import {language} from '../stores/stores';
</script>

<div class="top-bar" role="menu">
  <ul class="top-bar-list">
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
      <div class="user"><b>U</b></div>
    </li>
  </ul>
</div>

<style>
  .top-bar ul {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    gap: 0.4rem;
    list-style-type: none;
    padding: 0.6rem 0.8rem;
    background-color: var(--ra-grey-off-white);
  }

  .top-bar ul li:first-of-type {
    flex: 1 1 0;
  }

  @media screen and (min-width: 760px) {
    .top-bar ul li:first-of-type {
      display: none;
    }
  }
  .top-bar ul li:after {
    content: '|';
    color: var(--ra-grey-light);
    position: absolute;
    right: 0;
    top: 34%;
  }

  .top-bar ul li:first-of-type:after,
  .top-bar ul li:last-of-type:after {
    content: none;
  }

  .top-bar .user {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* :link, :visited */
  .top-bar a,
  .top-bar a:visited {
    color: var(--ra-grey-light);
  }

  .top-bar a:hover {
    color: var(--ra-blue-bright);
  }

  .top-bar a.active span {
    color: var(--ra-blue);
  }
</style>
