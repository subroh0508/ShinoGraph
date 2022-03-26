<script lang='ts'>
  import EditorArea from './EditorArea.svelte';
  import EditorFooter from './EditorFooter.svelte';
  import ResultTable from './ResultTable.svelte';
  import { Container } from '$lib/atoms/layout'
  import type { SparqlResult } from 'shinograph';

  export let query: string;
  export let result: SparqlResult | null = null;
  export let onExecuteQuery: (query: string) => {};

  $: isOk = result?.isOk || false;
  $: statusCode = result?.status || null;
  $: message = result?.message || [];
</script>

<Container>
  <EditorArea bind:code={ query }/>
  <EditorFooter
    statusCode={ statusCode }
    message={ message }
    onExecuteQuery={ () => onExecuteQuery(query) }
  />
  {#if isOk}
    <ResultTable
      vars={ result?.vars || [] }
      bindings={ result?.bindings || [] }
    />
  {/if}
</Container>
