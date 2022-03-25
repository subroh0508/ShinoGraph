<script lang='ts'>
  import { PaginatableTable } from '$molecules/table';
  import ResultTableHeader from './ResultTableHeader.svelte';
  import ResultTableBody from './ResultTableBody.svelte';
  import SparqlResult from '$lib/SparqlResult';

  export let result: SparqlResult | null = null;
</script>

{#if result && result.isOk}
  <div class='row result-table'>
    <PaginatableTable
      let:rows={ rows }
      let:offset={ offset }
      striped
      data={ result?.bindings || [] }
      footerColspan={ (result?.vars?.length || 0) + 1 }
    >
      <ResultTableHeader
        slot='header'
        vars={ result?.vars || [] }
      />
      <ResultTableBody
        slot='body'
        vars={ result?.vars || [] }
        rows={ rows }
        offset={ offset }
      />
    </PaginatableTable>
  </div>
{/if}

<style lang='scss'>
  .result-table {
    overflow-x: auto;
  }
</style>
