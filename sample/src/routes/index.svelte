<script context='module' lang='ts'>
  export const prerender = true;
</script>

<script lang='ts'>
  import { client } from '$lib/clients';
  import { DEFAULT_QUERY } from '$lib/constants';
  import alias from '$lib/alias.yml';

  let query = DEFAULT_QUERY;
  let result = 'Show results here';

  const handleClick = () => {
    client.execute(query, alias)
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
