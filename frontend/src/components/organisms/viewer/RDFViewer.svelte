<script context='module' lang='ts'>
  import { buildRDFData } from './buildRDFData';
</script>

<script lang='ts'>
  import { DataTable } from '$components/molecules/table';
  import type { QuerySolution, Properties } from '$types/sparql';
  import type { RDFElementKey } from './buildRDFData';

  export let headerKey: string;
  export let valueKey: RDFElementKey;
  export let data: QuerySolution[] = [];
  export let properties: Properties = {};

  $: rows = buildRDFData(headerKey, valueKey, data, properties);
</script>

<DataTable rows={ rows }/>
