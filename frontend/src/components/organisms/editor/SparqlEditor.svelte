<script lang='ts'>
  import { client } from '$lib/SparqlClient';

  import EditorArea from './EditorArea.svelte';
  import EditorFooter from './EditorFooter.svelte';
  import ResultTable from './ResultTable.svelte';
  import { Container } from '$components/atoms/layout'
  import SparqlResult from '$lib/SparqlResult';

  export let query: string;

  let result: SparqlResult | null = null;

  const handleClick = async () => {
    result = null;
    result = await client.execute(query);
  }
</script>

<Container>
  <EditorArea bind:code={ query }/>
  <EditorFooter onExecuteQuery={ handleClick }/>
  <ResultTable result={ result }/>
</Container>
