<script>
  export let value
  export let styles

  const pillColor = styles.reduce((color, style) => { 
    return style.value === value ? style.pillColor : color
  }, '')

</script>

<span class="relative inline-block py-1 font-medium text-gray-800 leading-tight">
  <span aria-hidden class="absolute inset-0 opacity-50 rounded-full { pillColor }" />
  <span class="relative p-2">{ value }</span>
</span>