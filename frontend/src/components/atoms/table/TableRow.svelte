<script lang='ts'>
  import TableHeader from './TableHeader.svelte';
  import TableData from './TableData.svelte';
  import type { TableRowItem } from '$types/table';

  export let row: TableRowItem[];
</script>

<tr>
  {#each row as r}
    {#if r.header}
      <TableHeader header={ r.item }/>
    {:else}
      <TableData datum={ r.item }/>
    {/if}
  {/each}
</tr>
