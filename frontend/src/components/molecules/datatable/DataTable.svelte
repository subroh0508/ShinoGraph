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
  import { Table, TableFooter } from '$components/atoms/table';
  import { Pagination } from '$components/atoms/button';

  export let headers: string[] = [];
  export let data: TableDatum[] = [];

  let page: number = 0;
  $: offset = ITEMS_PER_PAGE * page;
  $: totalPage = calculateTotalPage(data);
  $: paginatedData = buildPaginatedData(page, data);
</script>

<div class='datatable'>
  <Table
    striped
    headers={ headers }
    data={ paginatedData }
    offset={ offset }
  >
    {#if totalPage > 1}
      <TableFooter
        colspan={ headers.length + 1 }
      >
        <Pagination
          bind:page={ page }
          totalPage={ totalPage }
        />
      </TableFooter>
    {/if}
  </Table>
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
