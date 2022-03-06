<script lang='ts'>
  import { TableRow } from '$components/atoms/table';
  import type { TableDatum } from '$types/table';

  export let headerKey: string;
  export let valueKey: string;
  export let data: TableDatum[] = [];

  $: row = data.map(datum => (
    [
      { item: datum[headerKey], header: true },
      { item: datum[valueKey], header: false },
    ]
  ), []);
</script>

<table class='pure-table pure-table-bordered data-table'>
  {#if !!row.length}
    {#each row as r}
      <TableRow row={ r }/>
    {/each}
  {/if}
</table>

<style lang='scss'>
  .data-table {
    :global(th) {
      background-color: var(--normal-gray);
      border-bottom: 1px solid var(--dark-gray);
    }
  }
</style>
