<script lang="ts">
  // types

  // variables
  export let imgFiles: string[];
  export let title: string;
</script>

<img src={imgFiles[0]} alt={title} />

<style>
  img {
    flex: 0 0 100%;
    object-fit: cover;
    height: 60%;
    max-height: 28rem;
  }
</style>
