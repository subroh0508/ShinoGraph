<script context='module' lang='ts'>
  import { DEFAULT_QUERY } from '$lib/constants';

  export const prerender = false;
</script>

<script lang='ts'>
  import { SparqlEditor } from '$components/organisms/editor';
</script>

<SparqlEditor query={ DEFAULT_QUERY }/>
