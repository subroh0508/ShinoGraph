<script lang='ts'>
  import { PaginatableTable } from '$components/molecules/table';
  import SparqlResult from '$lib/SparqlResult';

  export let result: SparqlResult | null = null;

  $: header = (result && result.isOk) ? result.body.head.vars : [];
  $: data = (result && result.isOk) ? result.body.results.bindings : [];
</script>

{#if result && result.isOk}
  <div class='row result-table'>
    <PaginatableTable header={ header } data={ data }/>
  </div>
{/if}

<style lang='scss'>
  .result-table {
    overflow-x: auto;
  }
</style>
