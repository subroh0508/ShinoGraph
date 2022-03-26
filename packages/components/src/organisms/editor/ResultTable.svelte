<script lang='ts'>
  import { PaginatableTable } from '$molecules/table';
  import ResultTableHeader from './ResultTableHeader.svelte';
  import ResultTableBody from './ResultTableBody.svelte';
  import type { QuerySolution } from 'shinograph';

  export let vars: string[] = [];
  export let bindings: QuerySolution[] = [];
</script>

<div class='row result-table'>
  <PaginatableTable
    let:rows={ rows }
    let:offset={ offset }
    striped
    data={ bindings }
    footerColspan={ vars.length  + 1 }
  >
    <ResultTableHeader
      slot='header'
      vars={ vars }
    />
    <ResultTableBody
      slot='body'
      vars={ vars }
      rows={ rows }
      offset={ offset }
    />
  </PaginatableTable>
</div>

<style lang='scss'>
  .result-table {
    overflow-x: auto;
  }
</style>
