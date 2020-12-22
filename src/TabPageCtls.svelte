<script>
  import { firstRowToDisplay } from './stores/firstRowToDisplay'
  import { rowsPerPage } from './stores/rowsPerPage'

  //export let firstRowToDisplay;
  //export let rowsPerPage;
  export let totalNoRows;
  export let scrollBackward;
  export let scrollForward;

  $: lastRowOnPage =
    $firstRowToDisplay + $rowsPerPage > totalNoRows
      ? $firstRowToDisplay + $rowsPerPage - 1
      : $firstRowToDisplay + $rowsPerPage;

  let value = 10
  const handleRppChange = () => {
    console.log(`New selection: ${ value }`)
    rowsPerPage.reset(value)
  }
</script>

<div
  class="px-5 py-1 bg-white border-t flex flex-col items-center sm:flex-row sm:justify-between">
  <div class="my-1 flex sm:flex-row flex-col">
    <div class="flex flex-row mb-1 sm:mb-0">
      <div class="relative">
        <select bind:value on:change={ handleRppChange }
          class="text-sm appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-1 px-4 pr-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option> 
        </select>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <span class="text-xs text-gray-900 sm:text-sm">
    Showing { $firstRowToDisplay + 1 } to { lastRowOnPage } of { totalNoRows } rows
  </span>
  <div class="inline-flex mt-2 sm:mt-0">
    <button on:click={ scrollBackward }
      class="text-sm bg-gray-300 
    text-gray-800 font-semibold py-1 px-4 rounded-l 
    hover:bg-gray-400 focus:outline-none">Prev</button>
    <button on:click={ scrollForward }
      class="text-sm bg-gray-300 text-gray-800 
      font-semibold py-1 px-4 rounded-r 
    hover:bg-gray-400 focus:outline-none">Next</button>
  </div>
</div>
