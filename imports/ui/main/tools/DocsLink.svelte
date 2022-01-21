<script lang="ts">
  // variables
  export let name: string;
  export let title: string;
</script>

<a href="#{name}" tinro-ignore>{title}</a>

<style>
  a {
    text-decoration: none;
  }
</style>
