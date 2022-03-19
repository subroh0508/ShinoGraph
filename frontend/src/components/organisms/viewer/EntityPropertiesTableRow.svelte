<script lang='ts'>
  import { TableHeader, TableData } from '$components/molecules/table';
  import type { Property } from '$types/entity';

  export let property: Property
</script>

{#each property.objects as object, i}
  <tr>
    {#if i === 0}
      <TableHeader
        header={ property.predicate }
        rowspan={ 1 }
        colspan={ property.objects.length }
      />
    {/if}
    <TableData
      datum={ object }
      rowspan={ 1 }
      colspan={ 1 }
    />
  </tr>
{/each}
