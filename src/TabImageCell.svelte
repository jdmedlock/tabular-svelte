<script>
  export let value
</script>

<div class="image-outer-wrapper">
  <div class="image-inner-wrapper">
    <img class="image" src={ value } alt="" />
  </div>
</div>

<style type="text/postcss">
  .image-outer-wrapper {
    @apply flex items-center;
  }

  .image-inner-wrapper {
    @apply flex-shrink-0 w-10 h-10;
  }

  .image {
    @apply w-full h-full rounded-full;
  }
</style>