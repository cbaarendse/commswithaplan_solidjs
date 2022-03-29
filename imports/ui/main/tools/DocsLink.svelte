<script lang="ts">
  // variables
  export let name: string;
  export let displayName: string;
</script>

<a href="#{name}" data-tinro-ignore>{displayName}</a>

<style>
  a {
    text-decoration: none;
  }
</style>
