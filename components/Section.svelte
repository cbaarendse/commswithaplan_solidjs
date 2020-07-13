<script>
  export let imageUrl;
  export let id;
</script>

<style>
  div {
    background-repeat: no-repeat;
    background-attachment: fixed;
    width: auto;
  }
</style>

<div {id} style="background-image: url({imageUrl});" />
