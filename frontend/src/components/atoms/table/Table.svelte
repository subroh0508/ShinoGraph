<script context='module' lang='ts'>
  import type { TableDatum } from '$types/table';
</script>


<script lang='ts'>
  import TableHeader from './TableHeader.svelte';
  import TableData from './TableData.svelte';

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
    :global(.footer) {
      background-color: #e0e0e0;
      border-top: #cbcbcb;

      :global(th) {
        font-weight: normal;
      }
    }
  }
</style>