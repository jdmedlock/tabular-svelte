<script>
  export let firstRowToDisplay
  export let rowsPerPage
  export let totalNoRows
  export let scrollBackward
  export let scrollForward

  $: lastRowOnPage = (firstRowToDisplay + rowsPerPage) > totalNoRows
        ? firstRowToDisplay + rowsPerPage - 1 : firstRowToDisplay + rowsPerPage

</script>

<div class="pagination-controls">
  <span class="pagination-status-text">
    Showing { firstRowToDisplay+1 } to { lastRowOnPage } of { totalNoRows } rows
  </span>
  <div class="button-wrapper">
    <button on:click={ scrollBackward } class="prev-button">Prev</button>
    <button on:click={ scrollForward } class="next-button">Next</button>
  </div>
</div>

<style type="text/postcss">  
  .pagination-controls {
    @apply px-5 py-5 bg-white border-t flex flex-col items-center;
  }

  .pagination-status-text {
    @apply text-xs text-gray-900;
  }

  .button-wrapper {
    @apply inline-flex mt-2;
  }

  .prev-button {
    @apply text-sm bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l;
  }

  .next-button {
    @apply text-sm bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-r;
  }

  /* Extra small Screen */
  @screen sm {
    .pagination-controls {
      @apply flex-row justify-between;
    }

    .pagination-status-text {
      @apply text-sm;
    }
  
    .button-wrapper {
      @apply mt-0;
    }
  }

  /* Hover States */
  .prev-button:hover,
  .next-button:hover {
    @apply bg-gray-400;
  }

  .prev-button:focus,
  .next-button:focus {
    @apply outline-none;
  }

</style>