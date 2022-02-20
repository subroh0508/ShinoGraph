<script context='module' lang='ts'>
  import type { Item } from "./TableData.svelte";

  export interface Datum {
    [key: string]: Item
  }
</script>


<script lang='ts'>
  import TableHeader from './TableHeader.svelte';
  import TableData from './TableData.svelte';

  export let headers: string[] = [];
  export let data: Datum[] = [];
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
    {#each rows as row, i}
      <TableData i={ offset + i + 1 } items={ row }/>
    {/each}
  </tbody>
  {#if $$slots.footer}
    <tfoot class='footer'>
      <tr>
        <th colspan={ headers.length + 1 }>
          <slot name='footer'/>
        </th>
      </tr>
    </tfoot>
  {/if}
</table>

<style lang='scss'>
  .pure-table {
    .footer {
      background-color: #e0e0e0;
      border-top: #cbcbcb;

      th {
        font-weight: normal;
      }
    }
  }
</style>