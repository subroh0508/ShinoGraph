<script lang='ts' context='module'>
  import type { TableRowItem } from '$types/table';

  const ITEMS_PER_PAGE = 10;

  function calculateTotalPage(rows: TableRowItem[][]): number {
    return Math.ceil(rows.slice(1).length / ITEMS_PER_PAGE);
  }

  function sliceRows(rows: TableRowItem[][], page: number): TableRowItem[][] {
    const offset = page * ITEMS_PER_PAGE + 1;

    return rows.slice(offset, offset + ITEMS_PER_PAGE);
  }
</script>

<script lang='ts'>
  import Pagination from './Pagination.svelte';
  import TableRow from './TableRow.svelte';
  import TableFooter from './TableFooter.svelte';
  import type { TableRowItem } from '$types/table';

  export let rows: TableRowItem[][] = [];
  export let striped: boolean = false;

  let page: number = 0;

  $: header = rows[0] || [];
  $: data = sliceRows(rows, page);
  $: totalPage = calculateTotalPage(rows);
</script>

<div class='paginatable-table'>
  <table class='pure-table'
    class:pure-table-striped={ striped }
    class:pure-table-bordered={ !striped }>
    <thead>
      <TableRow row={ header }/>
    </thead>
    <tbody>
      {#each data as row}
        <TableRow row={ row }/>
      {/each}
    </tbody>
    {#if totalPage > 1}
      <TableFooter colspan={ header.length + 1 }>
        <Pagination
          bind:page={ page }
          totalPage={ totalPage }
        />
      </TableFooter>
    {/if}
  </table>
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
  .pure-table {
    background-color: var(--pure-white);

    :global(.footer) {
      background-color: var(--normal-gray);
      border-top: 1px solid var(--dark-gray);

      :global(th) {
        font-weight: normal;
      }
    }
  }
</style>
