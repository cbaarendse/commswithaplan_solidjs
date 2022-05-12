<script>
  // imports
  import Button from '../reusable/Button.svelte';
  import {language} from '../stores/utils';

  // variables

  //functions
</script>

<footer on:clickedButton>
  <span>© 2013-2021 Comms With A Plan</span>
  <nav>
    <a href="/consultancy/contact">Contact</a><a href="/legal/termsandconditions"
      >{$language === 'dutch' ? 'Legaal' : 'Legal'}</a
    >
  </nav>
  <Button
    btn={{
      type: 'button',
      role: 'button',
      className: 'consent__visibility',
      backgroundColor: 'transparent',
      height: 'fit-content',
      disabled: false
    }}
    on:clickedButton><span class="button__text">&#127850;</span></Button
  >
</footer>

<style>
  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  a {
    color: var(--ra-blue);
    text-decoration: none;
    margin: 0 1rem;
  }
  span.button__text {
    font-size: var(--ra-fs-m);
  }
</style>
