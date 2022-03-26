<script lang='ts' context='module'>
  const ITEMS_PER_PAGE = 10;

  function calculateTotalPage(data: any[]): number {
    return Math.ceil(data.length / ITEMS_PER_PAGE);
  }

  function offset(page: number): number {
    return page * ITEMS_PER_PAGE;
  }

  function sliceRows(data: any[], page: number): any[] {
    return data.slice(offset(page), offset(page) + ITEMS_PER_PAGE);
  }
</script>

<script lang='ts'>
  import Pagination from './Pagination.svelte';
  import TableFooter from './TableFooter.svelte';

  export let data: any[] = [];
  export let striped: boolean = false;
  export let footerColspan: number = 0;

  let page: number = 0;

  $: rows = sliceRows(data, page);
  $: totalPage = calculateTotalPage(data);
</script>

<div class='paginatable-table'>
  <table class='pure-table'
    class:pure-table-striped={ striped }
    class:pure-table-bordered={ !striped }>
    <slot name='header'/>
    <slot name='body' rows={ rows } offset={ offset(page) }/>
    {#if totalPage > 1}
      <TableFooter colspan={ footerColspan }>
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
