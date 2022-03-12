<script lang='ts' context='module'>
  import buildPaginatableData from './buildPaginatableData';
</script>

<script lang='ts'>
  import { PaginatableTable } from '$components/molecules/table';
  import SparqlResult from '$lib/SparqlResult';

  export let result: SparqlResult | null = null;

  $: rows = buildPaginatableData(result?.vars || [], result?.bindings || []);
</script>

{#if result && result.isOk}
  <div class='row result-table'>
    <PaginatableTable
      striped
      rows={ rows }
    />
  </div>
{/if}

<style lang='scss'>
  .result-table {
    overflow-x: auto;
  }
</style>
