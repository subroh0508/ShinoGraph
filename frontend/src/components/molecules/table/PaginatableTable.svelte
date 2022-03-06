<script lang='ts' context='module'>
  import type { TableDatum } from '$types/table';

  const ITEMS_PER_PAGE = 10;

  const calculateTotalPage = (data: TableDatum[]): number => Math.ceil(data.length / ITEMS_PER_PAGE);
  const buildPaginatedData = (
    page: number,
    data: TableDatum[],
  ): TableDatum[] => data.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
</script>

<script lang='ts'>
  import type { TableDatum } from '$types/table';
  import DataListTable from './DataListTable.svelte';
  import Pagination from './Pagination.svelte';
  import { TableFooter } from '$components/atoms/table';

  export let header: string[] = [];
  export let data: TableDatum[] = [];

  let page: number = 0;
  $: offset = ITEMS_PER_PAGE * page;
  $: totalPage = calculateTotalPage(data);
  $: paginatedData = buildPaginatedData(page, data);
</script>

<div class='paginatable-table'>
  <DataListTable
    striped
    header={ header }
    data={ paginatedData }
    offset={ offset }
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
