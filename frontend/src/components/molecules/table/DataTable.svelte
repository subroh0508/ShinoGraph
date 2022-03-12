<script lang='ts'>
  import TableRow from './TableRow.svelte';
  import type { TableRowItem } from '$types/table';

  export let rows: TableRowItem[][] = [];
</script>

<table class='pure-table pure-table-bordered data-table'>
  {#each rows as row}
    <TableRow row={ row }/>
  {/each}
</table>

<style lang='scss'>
  .data-table {
    :global(th) {
      background-color: var(--normal-gray);
      border-bottom: 1px solid var(--dark-gray);
    }
  }
</style>
