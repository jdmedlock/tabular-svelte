<script>
  import { createEventDispatcher } from 'svelte'
  import { FontAwesomeIcon } from 'fontawesome-svelte'
  import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

  import { firstRowToDisplay } from './stores/firstRowToDisplay'
  import { rowsPerPage } from './stores/rowsPerPage'

  import TabImageCell from './TabImageCell.svelte'
  import TabPillCell from './TabPillCell.svelte'
  import TabTextCell from './TabTextCell.svelte'
  import TabPageCtls from './TabPageCtls.svelte'

  export let definition

  const dispatch = createEventDispatcher()

  let sortOptions

  const retrieveDataPage = (rowsToScroll, rowsPerPage, sortOptions) => {
    return definition.dataSource.reader(rowsToScroll, rowsPerPage, sortOptions)
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
            componentInvocation = { component: TabImageCell, dataName: `${ definition.columns[index].dataName }`, value: `${ cellValue }` }
            break
          case 'pill':
            // Accept `decorators` as an alias for `styles`
            if (definition.columns[index].decorators) {
              componentInvocation = { component: TabPillCell, dataName: `${ definition.columns[index].dataName }`, value: `${ cellValue }`, 
                styles: definition.columns[index].decorators }
              break
            }
            componentInvocation = { component: TabPillCell, dataName: `${ definition.columns[index].dataName }`, value: `${ cellValue }`, 
              styles: definition.columns[index].styles }
            break
          case 'text':
            componentInvocation = { component: TabTextCell, dataName: `${ definition.columns[index].dataName }`, value: `${ cellValue }` }
            break
          default: 
            throw `Unknown cell type encountered (type: ${ definition.columns[index].type })`
        }
        return componentInvocation
      })
    })
  }

  const scrollBackward = () => {
    const newFirstRowToDisplay = $firstRowToDisplay - $rowsPerPage
    if (newFirstRowToDisplay >= 0) {
      firstRowToDisplay.backward($rowsPerPage)
      data = retrieveDataPage($firstRowToDisplay, $rowsPerPage, sortOptions)
      componentRows = formatComponents()
    }
  }

  const scrollForward = () => {
    const newFirstRowToDisplay = $firstRowToDisplay + $rowsPerPage
    if (newFirstRowToDisplay <= definition.dataSource.totalRows) {
      firstRowToDisplay.forward($rowsPerPage)
      data = retrieveDataPage($firstRowToDisplay, $rowsPerPage, sortOptions)
      componentRows = formatComponents()
    }
  }

  const updateRowsPerPage = (noRowsPerPage) => {
    currentNoRowsPerPage = noRowsPerPage
    rowsPerPage.reset(noRowsPerPage)
    data = retrieveDataPage(0,$rowsPerPage)
    componentRows = formatComponents()
  }

  let currentNoRowsPerPage 
  let data = retrieveDataPage(0,$rowsPerPage)

  if ($rowsPerPage === 0) {
    currentNoRowsPerPage = definition.dataSource.rowsPerPage === -1 
      ? data.length : definition.dataSource.rowsPerPage
    rowsPerPage.reset(currentNoRowsPerPage)
  }
  
  data = retrieveDataPage(0,$rowsPerPage, sortOptions)
  let componentRows = formatComponents()

  const sortAscending = (columnName) => {
    sortOptions = { order: 'ASC', dataName: columnName }
    data = retrieveDataPage($firstRowToDisplay, $rowsPerPage, sortOptions )
    componentRows = formatComponents()
  }

  const sortDescending = (columnName) => {
    sortOptions = { order: 'DESC', dataName: columnName }
    data = retrieveDataPage($firstRowToDisplay, $rowsPerPage, sortOptions )
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
            text-left text-sm font-semibold text-gray-600 uppercase
            tracking-wider">
            <div class="flex align-middle">
              { column.heading }
              <span class="ml-5">
                <span on:click={ () => sortAscending(column.dataName) }>
                  <FontAwesomeIcon icon={ faCaretDown } size="lg" class="text-gray-700" />
                </span>
                <span on:click={ () => sortDescending(column.dataName) }>
                  <FontAwesomeIcon icon={ faCaretUp } size="lg" class="text-gray-700"/>
                </span>
              </span>
            </div>
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