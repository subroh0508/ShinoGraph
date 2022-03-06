<script context='module' lang='ts'>
  export const prerender = true;
</script>

<script lang='ts'>
  import { DataTable } from '$components/molecules/table';

  export let subject = { head: { vars: [] }, results: { bindings: [] } };

  $: data = subject.results.bindings;
</script>

<div>
  <DataTable
    headerKey='predicate'
    valueKey='object'
    data={ data }
  />
</div>

