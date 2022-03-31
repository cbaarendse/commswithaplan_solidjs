<script>
  import Button from '../reusable/Button.svelte';
</script>

<div>
  <span>© 2013-2021 Comms With A Plan</span>
  <nav><a href="/consultancy/contact">Contact</a></nav>
  <Button
    btn={{
      type: 'button',
      role: 'button',
      className: 'cookieConsentButton',
      backgroundColor: 'transparent',
      height: 'var(--ra-xl)',
      disabled: false
    }}
    on:clickedButton>&#127850;</Button
  >
</div>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem 2rem;
  }
  a {
    color: var(--ra-blue);
    text-decoration: none;
  }
</style>
