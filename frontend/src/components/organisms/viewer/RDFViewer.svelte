<script context='module' lang='ts'>
  import { buildRDFData } from './buildRDFData';
</script>

<script lang='ts'>
  import { DataTable } from '$components/molecules/table';
  import type { QuerySolution } from '$types/sparql';
  import type { ValueKey } from './buildRDFData';

  export let headerKey: string;
  export let valueKey: ValueKey;
  export let data: QuerySolution[] = [];

  $: rows = buildRDFData(headerKey, valueKey, data);
</script>

<DataTable rows={ rows }/>
