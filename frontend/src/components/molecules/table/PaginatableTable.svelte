<script lang='ts' context='module'>
  import type { DataListItem } from '$types/table';

  const ITEMS_PER_PAGE = 10;

  const calculateTotalPage = (data: DataListItem[]): number => Math.ceil(data.length / ITEMS_PER_PAGE);
  const buildPaginatedData = (
    page: number,
    data: DataListItem[],
  ): DataListItem[] => data.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
</script>

<script lang='ts'>
  import type { DataListItem } from '$types/table';
  import DataListTable from './DataListTable.svelte';
  import Pagination from './Pagination.svelte';
  import { TableFooter } from '$components/atoms/table';

  export let header: string[] = [];
  export let data: DataListItem[] = [];

  let page: number = 0;
  $: offset = ITEMS_PER_PAGE * page;
  $: totalPage = calculateTotalPage(data);
  $: paginatedData = buildPaginatedData(page, data);
</script>

<div class='datatable'>
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
  .datatable {
    :global(.pure-table) {
      width: 100%
    }
    :global(.pure-button-group) {
      justify-content: flex-end;
    }
  }
</style>
