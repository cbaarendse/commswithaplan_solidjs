<footer>
  <slot />
</footer>

<style>
  footer {
    display: flex;
    justify-content: center;
    padding: 0.5em;
    background-color: var(--ra-white);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    font-size: clamp(var(--font-size-xs), var(--font-size-weight) * 100vw, var(--font-size-m));
  }
</style>
