<script context='module' lang='ts'>
  export const prerender = true;
</script>

<script lang='ts'>
  import { IRIViewer } from '$components/organisms/viewer';
  import type { QuerySolution } from '$types/sparql';

  export let subject: QuerySolution[] = [];
</script>

<div>
  <IRIViewer
    headerKey='predicate'
    valueKey='object'
    data={ subject }
  />
</div>

