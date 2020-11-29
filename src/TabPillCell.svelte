<script>
  export let value
  export let decorators

  const pillColor = decorators.reduce((color, decorator) => { 
    return decorator.value === value ? decorator.pillColor : color
  }, '')

</script>

<span class="image-wrapper">
  <span aria-hidden class="pill-wrapper { pillColor }" />
  <span class="pill">{ value }</span>
</span>

<style type="text/postcss">
  .image-wrapper {
    @apply relative inline-block py-1 font-medium text-gray-800 leading-tight;
  }

  .pill-wrapper {
    @apply absolute inset-0 opacity-50 rounded-full;
  }

  .pill {
    @apply relative p-2;
  }
</style>