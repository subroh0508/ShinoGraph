<script lang='ts'>
  import { TableHeader } from '$lib/molecules/table';

  export let vars: string[] = [];
</script>

<thead>
 {#if !!vars.length}
   <tr>
     {#each ['#', ...vars] as v}
       <TableHeader label={ v }/>
     {/each}
   </tr>
 {/if}
</thead>
