<script lang='ts'>
  export let headers: string[];
</script>

<tr>
  {#if !!headers.length}
    <th>#</th>
  {/if}
  {#each headers as header}
    <th>{ header }</th>
  {/each}
</tr>
