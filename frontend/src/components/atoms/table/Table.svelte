<script lang='ts'>
  import TableHeader from './TableHeader.svelte';
  import TableData from './TableData.svelte';
  import type { Datum } from './TableData.svelte';

  export let headers: string[] = [];
  export let data: Datum[] = [];
  export let striped: boolean = false;

  const rows = data.map(datum => headers.map(header => datum[header]));
</script>

<table class='pure-table'
  class:pure-table-striped={ striped }
  class:pure-table-bordered={ !striped }>
  <thead>
    <TableHeader { headers }/>
  </thead>
  <tbody>
    {#each rows as row, i}
      <TableData i={ i + 1 } data={ row }/>
    {/each}
  </tbody>
</table>
