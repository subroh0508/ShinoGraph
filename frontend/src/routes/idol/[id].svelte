<script context='module' lang='ts'>
  export const prerender = true;
</script>

<script lang='ts'>
  import { RDFEntityViewer } from '$components/organisms/viewer';
  import type { QuerySolution, Properties } from '$types/sparql';

  export let subject: QuerySolution[] = [];
  export let properties: Properties = {};
</script>

<div>
  <RDFEntityViewer
    headerKey='predicate'
    valueKey={{ primary: 'object', secondary: 'objectName' }}
    data={ subject }
    properties={ properties }
  />
</div>

