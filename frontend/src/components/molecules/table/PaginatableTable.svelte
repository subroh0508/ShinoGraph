<script lang='ts' context='module'>
  import type { TableRowItem } from '$types/table';

  const ITEMS_PER_PAGE = 10;

  function calculateTotalPage(rows: TableRowItem[][]): number {
    return Math.ceil(rows.slice(1).length / ITEMS_PER_PAGE);
  }

  function sliceRows(rows: TableRowItem[][], page: number) {
    const offset = page * ITEMS_PER_PAGE + 1;

    return rows.slice(offset, offset + ITEMS_PER_PAGE);
  }
</script>

<script lang='ts'>
  import type { TableRowItem } from '$types/table';
  import DataListTable from './DataListTable.svelte';
  import Pagination from './Pagination.svelte';
  import { TableFooter } from '$components/atoms/table';

  export let rows: TableRowItem[][] = [];
  export let striped: boolean = false;

  let page: number = 0;

  $: header = rows[0];
  $: data = sliceRows(rows, page);
  $: totalPage = calculateTotalPage(rows);
</script>

<div class='paginatable-table'>
  <DataListTable
    striped={ striped }
    header={ header }
    data={ data }
  >
    {#if totalPage > 1}
      <TableFooter
        colspan={ header.length + 1 }
      >
        <Pagination
          bind:page={ page }
          totalPage={ totalPage }
        />
      </TableFooter>
    {/if}
  </DataListTable>
</div>

<style lang='scss'>
  .paginatable-table {
    :global(.pure-table) {
      width: 100%
    }
    :global(.pure-button-group) {
      justify-content: flex-end;
    }
  }
</style>
