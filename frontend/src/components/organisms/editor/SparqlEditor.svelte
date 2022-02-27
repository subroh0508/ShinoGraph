<script lang='ts'>
  import { client } from '$lib/SparqlClient';

  import EditorArea from './EditorArea.svelte';
  import EditorFooter from './EditorFooter.svelte';
  import ResultTable from './ResultTable.svelte';
  import { Container } from '$components/atoms/layout'

  export let query: string;
  
  let resource = { head: { vars: [] }, results: { bindings: [] } };

  const handleClick = async () => {
    resource = { head: { vars: [] }, results: { bindings: [] } };
    resource = await client.execute(query);
  }
</script>

<Container>
  <EditorArea bind:code={ query }/>
  <EditorFooter onExecuteQuery={ handleClick }/>
  <ResultTable resource={ resource }/>
</Container>
