<script context='module' lang='ts'>
  export const prerender = false;

  export const sample = `PREFIX scdb: <https://283db.org/schema#>
PREFIX : <http://schema.org/>
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbp: <http://ja.dbpedia.org/resource/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object
}
LIMIT 25`;

  const submit = async (query: string) => {
    const res = await fetch(
      `http://localhost:3000/spql/query?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: { 'Accept': 'application/sparql-results+json' },
      },
    );

    return await res.json();
  }
</script>

<script lang='ts'>
  import SparqlEditor from '$lib/editor/SparqlEditor.svelte';
  import { onMount } from 'svelte';

  let editor;
  let query = sample;
  let result = 'Show results here';
  let cursor = false;

  onMount(() => console.log("Editor: ", editor));

  function cursorMoved(event) {
    cursor = true;
    console.log('cursor activity');
    // console.log(event.detail)

  }

  function onQueryChanged(event: CustomEvent) {
    query = event.detail.value;

    console.log('changed: ', query);
  }

  const handleClick = async () => {
    const json = await submit(query);
    result = JSON.stringify(json, null, 2);
  }
</script>

<div>
  <SparqlEditor
    on:activity={ cursorMoved }
    on:change={ onQueryChanged }
    bind:editor={ editor }
    code={ sample }
  />
  <button on:click={handleClick}>Submit</button>
</div>
<p>
  Cursor Activity: { cursor }
</p>
<div>
  <button on:click={() => editor.execCommand('selectAll')}>
    Select All
  </button>

  <button on:click={() => editor.setCursor(0)}>
    Cursor at Start
  </button>

  <button on:click={() => editor.setCursor(editor.getValue().length)}>
    Cursor at End
  </button>
</div>

<style>
  :global(.editor) {
    font-size: 2rem;
  }
</style>
