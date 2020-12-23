<script>
  import { onMount } from 'svelte';
  import { firstRowToDisplay } from './stores/firstRowToDisplay'
  import { rowsPerPage } from './stores/rowsPerPage'

  import TabImageCell from './TabImageCell.svelte'
  import TabPillCell from './TabPillCell.svelte'
  import TabTextCell from './TabTextCell.svelte'
  import TabPageCtls from './TabPageCtls.svelte'

  export let definition

  let currentNoRowsPerPage 
  if ($rowsPerPage === 0) {
    currentNoRowsPerPage = definition.dataSource.rowsPerPage === -1 
      ? data.length : definition.dataSource.rowsPerPage
    rowsPerPage.reset(currentNoRowsPerPage)
  }

  const retrieveDataPage = (rowsToScroll, rowsPerPage) => {
    return definition.dataSource.reader(rowsToScroll, rowsPerPage)
  }

  const formatComponents = () => {
    return data.map((row) => {
      const rowKeys = Object.keys(row)
      return rowKeys.map((cellKey) => {
        const cellValue = row[cellKey]
        let componentInvocation

        const index = definition.columns.findIndex(column => column.dataName === cellKey);
        switch (definition.columns[index].type) {
          case 'image':
            componentInvocation = { component: TabImageCell, value: `${ cellValue }` }
            break
          case 'pill':
            // Accept `decorators` as an alias for `styles`
            if (definition.columns[index].decorators) {
              componentInvocation = { component: TabPillCell, value: `${ cellValue }`, 
                styles: definition.columns[index].decorators }
              break
            }
            componentInvocation = { component: TabPillCell, value: `${ cellValue }`, 
              styles: definition.columns[index].styles }
            break
          case 'text':
            componentInvocation = { component: TabTextCell, value: `${ cellValue }` }
            break
          default: 
            throw `Unknown cell type encountered (type: ${ definition.columns[index].type })`
        }
        return componentInvocation
      })
    })
  }

  let data = retrieveDataPage(0,$rowsPerPage)
  let componentRows = formatComponents()

  const scrollBackward = () => {
    const newFirstRowToDisplay = $firstRowToDisplay - $rowsPerPage
    if (newFirstRowToDisplay >= 0) {
      firstRowToDisplay.backward($rowsPerPage)
      data = retrieveDataPage($firstRowToDisplay, $rowsPerPage)
      componentRows = formatComponents()
    }
  }

  const scrollForward = () => {
    const newFirstRowToDisplay = $firstRowToDisplay + $rowsPerPage
    if (newFirstRowToDisplay <= definition.dataSource.totalRows) {
      firstRowToDisplay.forward($rowsPerPage)
      data = retrieveDataPage($firstRowToDisplay, $rowsPerPage)
      componentRows = formatComponents()
    }
  }

  const updateRowsPerPage = (noRowsPerPage) => {
    currentNoRowsPerPage = noRowsPerPage
    rowsPerPage.reset(noRowsPerPage)
    data = retrieveDataPage(0,$rowsPerPage)
    componentRows = formatComponents()
  }

</script>

<!-- Based on https://tailwindcomponents.com/component/table-responsive-with-filters -->

<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
  <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">

    <!-- Pagination Controls -->
    <TabPageCtls totalNoRows={ definition.dataSource.totalRows }
      scrollBackward={ scrollBackward } 
      scrollForward={ scrollForward }
      updateRowsPerPage={ updateRowsPerPage } />

    <!-- Tabular Data Rows -->
    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          {#each definition.columns as column}
          <th class="px-2 py-3 border-b-2 border-gray-200 bg-gray-100
            text-left text-xs font-semibold text-gray-600 uppercase
            tracking-wider">
            { column.heading }
          </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each componentRows as row}
          <tr>
          {#each row as cell}
            <td class="px-2 py-5 border-b border-gray-200 bg-white text-sm">
              {#if cell.component === TabPillCell}
                <svelte:component this={ cell.component } value={ cell.value } styles={ cell.styles } />
              {:else}
                <svelte:component this={ cell.component } value={ cell.value } />
              {/if}
            </td>
          {/each}
          </tr>
        {/each}
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <TabPageCtls totalNoRows={ definition.dataSource.totalRows }
      scrollBackward={ scrollBackward } 
      scrollForward={ scrollForward }
      updateRowsPerPage={ updateRowsPerPage } />
  </div>
</div>