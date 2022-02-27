<script lang='ts'>
  import { DataTable } from '$components/molecules/table';

  export let resource = { head: { vars: [] }, results: { bindings: [] } };

  $: headers = resource.head.vars;
  $: data = resource.results.bindings
</script>

{#if !!headers.length}
  <div class='row result-table'>
    <DataTable headers={ headers } data={ data }/>
  </div>
{/if}

<style lang='scss'>
  .result-table {
    overflow-x: auto;
  }
</style>
