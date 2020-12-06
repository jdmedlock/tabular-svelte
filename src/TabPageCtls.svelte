<script>
  export let firstRowToDisplay
  export let rowsPerPage
  export let totalNoRows
  export let scrollBackward
  export let scrollForward

  $: lastRowOnPage = (firstRowToDisplay + rowsPerPage) > totalNoRows
        ? firstRowToDisplay + rowsPerPage - 1 : firstRowToDisplay + rowsPerPage

</script>

<div class="px-5 py-5 bg-white border-t flex flex-col items-center sm:flex-row sm:justify-between">
  <span class="text-xs text-gray-900 sm:text-sm">
    Showing { firstRowToDisplay+1 } to { lastRowOnPage } of { totalNoRows } rows
  </span>
  <div class="inline-flex mt-2 sm:mt-0">
    <button on:click={ scrollBackward } class="text-sm bg-gray-300 
    text-gray-800 font-semibold py-2 px-4 rounded-l 
    hover:bg-gray-400 focus:outline-none">Prev</button>
    <button on:click={ scrollForward } class="bg-gray-300 text-gray-800 
      font-semibold py-2 px-4 rounded-r 
    hover:bg-gray-400 focus:outline-none">Next</button>
  </div>
</div>