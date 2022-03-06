<script lang='ts'>
  import { PaginatableTable } from '$components/molecules/table';

  export let resource = { head: { vars: [] }, results: { bindings: [] } };

  $: header = resource.head.vars;
  $: data = resource.results.bindings
</script>

{#if !!header.length}
  <div class='row result-table'>
    <PaginatableTable header={ header } data={ data }/>
  </div>
{/if}

<style lang='scss'>
  .result-table {
    overflow-x: auto;
  }
</style>
