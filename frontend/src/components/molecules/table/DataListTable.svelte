<script lang='ts'>
  import { TableRow } from '$components/atoms/table';
  import type { TableRowItem } from '$types/table';

  export let header: TableRowItem[] = [];
  export let data: TableRowItem[][] = [];
  export let striped: boolean = false;
</script>

<table class='pure-table'
  class:pure-table-striped={ striped }
  class:pure-table-bordered={ !striped }>
  <thead>
    <TableRow row={ header }/>
  </thead>
  <tbody>
    {#if !!data.length}
      {#each data as row}
        <TableRow row={ row }/>
      {/each}
    {/if}
  </tbody>
  <slot/>
</table>

<style lang='scss'>
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
