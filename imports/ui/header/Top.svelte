<script lang="ts">
  // imports
  import ToggleButton from './ToggleButton.svelte';
  import {language} from '../stores/utils';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faUser} from '@fortawesome/free-solid-svg-icons';
</script>

<!-- TopBar has room for functionality used from all over the site. Eventual cookies and/or marketing messages. -->
<menu>
  <li>
    <ToggleButton />
  </li>
  <li>
    <a
      href={'javascript:void(0)'}
      class:active={$language === 'dutch'}
      on:click={() => ($language = 'dutch')}
      data-tinro-ignore
    >
      <span>NL</span>
    </a>
  </li>
  <li><span class="divider">|</span></li>
  <li>
    <a
      href={'javascript:void(0)'}
      class:active={$language === 'english'}
      on:click={() => ($language = 'english')}
      data-tinro-ignore
    >
      <span>EN</span>
    </a>
  </li>
  <li>
    <Fa icon={faUser} />
  </li>
</menu>

<style>
  menu {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    gap: 1.4rem;
    padding: 0.6rem 0.8rem;
    background-color: var(--ra-grey-off-white);
  }

  menu li {
    display: flex;
    justify-content: center;
    align-items: baseline;
  }

  menu li:first-of-type {
    flex: 1 1 0;
  }

  @media screen and (min-width: 760px) {
    menu li:first-of-type {
      display: none;
    }
  }
  menu li:after {
    content: '|';
    color: var(--ra-grey-light);
    position: absolute;
    right: 0;
    top: 34%;
  }

  menu li:first-of-type:after,
  menu li:last-of-type:after {
    content: none;
  }

  /* :link, :visited */
  menu a {
    display: flex;
    justify-content: center;
    align-items: baseline;
  }
  menu a,
  menu a:visited {
    color: var(--ra-grey-light);
  }

  menu a:hover {
    color: var(--ra-blue-bright);
  }

  menu a.active span {
    color: var(--ra-blue);
  }
</style>
