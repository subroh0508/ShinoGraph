<script context='module' lang='ts'>
  export const prerender = true;
</script>

<script lang='ts'>
  import { DataTable } from '$components/molecules/table';
  import type { QuerySolution } from '$types/sparql';

  export let subject: QuerySolution[] = [];
</script>

<div>
  <DataTable
    headerKey='predicate'
    valueKey='object'
    data={ subject }
  />
</div>

