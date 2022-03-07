<script lang='ts'>
  import TableHeader from './TableHeader.svelte';
  import TableData from './TableData.svelte';
  import type { TableRowItem } from '$types/table';

  export let row: TableRowItem[];
</script>

<tr>
  {#each row as r}
    {#if r.header}
      <TableHeader
        header={ r.item }
        rowspan={ r.rowspan || 1 }
        colspan={ r.colspan || 1 }
      />
    {:else}
      <TableData
        datum={ r.item }
        rowspan={ r.rowspan || 1 }
        colspan={ r.colspan || 1 }
      />
    {/if}
  {/each}
</tr>
