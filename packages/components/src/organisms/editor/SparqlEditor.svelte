<script lang='ts'>
  import { SparqlResult } from '@shinograph/client';
  import EditorArea from './EditorArea.svelte';
  import EditorFooter from './EditorFooter.svelte';
  import ResultTable from './ResultTable.svelte';
  import { Container } from '$atoms/layout'

  export let query: string;
  export let result: SparqlResult | null = null;
  export let onExecuteQuery: (query: string) => {};

  $: statusCode = result !== null ? result.status : null;
  $: message = result !== null ? result.message : [];
</script>

<Container>
  <EditorArea bind:code={ query }/>
  <EditorFooter
    statusCode={ statusCode }
    message={ message }
    onExecuteQuery={ () => onExecuteQuery(query) }
  />
  <ResultTable result={ result }/>
</Container>
