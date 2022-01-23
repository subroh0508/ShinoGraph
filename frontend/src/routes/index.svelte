<script context='module' lang='ts'>
  export const prerender = true;
</script>

<script lang='ts'>
  let query = `SELECT ?subject ?predicate ?object
WHERE {
  ?subject ?predicate ?object
}
LIMIT 25
`;
  let result = 'Show results here';

  const submit = async () => {
    const res = await fetch(
      `http://localhost:3000/sample/query?query=${encodeURIComponent(query)}`,
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
    <textarea name='query' cols='80' rows='20'>{query}</textarea>
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
