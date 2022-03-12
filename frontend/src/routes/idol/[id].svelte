<script context='module' lang='ts'>
  export const prerender = true;
</script>

<script lang='ts'>
  import { RDFViewer } from '$components/organisms/viewer';
  import type { QuerySolution } from '$types/sparql';

  export let subject: QuerySolution[] = [];
</script>

<div>
  <RDFViewer
    headerKey='predicate'
    valueKey={{ primary: 'object', secondary: 'objectName' }}
    data={ subject }
  />
</div>

