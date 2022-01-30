<script context='module' lang='ts'>
  export const prerender = true;
</script>

<script lang='ts'>
  let query = `PREFIX scdb: <https://283db.org/schema#>
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
LIMIT 25
`;
  let result = 'Show results here';

  const submit = async () => {
    const res = await fetch(
      `http://localhost:3000/spql/query?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: { 'Accept': 'application/sparql-results+json' },
      },
    );

    return await res.json();
  }

  const handleClick = () => {
    submit()
      .then(json => { result = JSON.stringify(json, null, 2); });
  }
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <div>
    <textarea name='query' cols='80' rows='20' bind:value={query}></textarea>
    <br/>
    <button on:click={handleClick}>Submit</button>
  </div>
  <div>
    <pre>{result}</pre>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  h1 {
    width: 100%;
  }
</style>
