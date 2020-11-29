<script>
  export let value
</script>

<p class="text">{ value }</p>

<style type="text/postcss">
  .text {
    @apply text-gray-900 whitespace-no-wrap;
  }
</style>