<script context='module' lang='ts'>
  import type { TableDatum } from '$types/table';
</script>


<script lang='ts'>
  import { TableHeader, TableData } from '$components/atoms/table';

  export let headers: string[] = [];
  export let data: TableDatum[] = [];
  export let offset: number = 0;
  export let striped: boolean = false;

  $: rows = data.map(datum => headers.map(header => datum[header]));
</script>

<table class='pure-table'
  class:pure-table-striped={ striped }
  class:pure-table-bordered={ !striped }>
  <thead>
    <TableHeader { headers }/>
  </thead>
  <tbody>
    {#if !!headers.length}
      {#each rows as row, i}
        <TableData i={ offset + i + 1 } items={ row }/>
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