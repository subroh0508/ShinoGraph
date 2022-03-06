<script lang='ts'>
  import { client } from '$lib/SparqlClient';

  import EditorArea from './EditorArea.svelte';
  import EditorFooter from './EditorFooter.svelte';
  import ResultTable from './ResultTable.svelte';
  import { Container } from '$components/atoms/layout'
  import SparqlResult from '$lib/SparqlResult';

  export let query: string;

  let result: SparqlResult | null = null;

  $: statusCode = !!result ? result.status : null;
  $: message = !!result ? result.message : [];

  const handleClick = async () => {
    result = null;
    result = await client.execute(query);
  }
</script>

<Container>
  <EditorArea bind:code={ query }/>
  <EditorFooter
    statusCode={ statusCode }
    message={ message }
    onExecuteQuery={ handleClick }
  />
  <ResultTable result={ result }/>
</Container>
