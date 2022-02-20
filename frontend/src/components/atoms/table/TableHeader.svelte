<script lang='ts'>
  export let headers: string[];
</script>

<tr>
  <th>#</th>
  {#each headers as header}
    <th>{ header }</th>
  {/each}
</tr>
