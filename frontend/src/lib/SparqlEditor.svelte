<script lang='ts'>
  import { client } from '$lib/SparqlClient';
  import { DEFAULT_QUERY } from '$lib/constants';
  import EditorArea from './editor/EditorArea.svelte';
  import type { EditorFromTextArea } from 'codemirror';

  let query = DEFAULT_QUERY;
  let result = 'Show results here';
  let editor: EditorFromTextArea = null;
  let cursor = false;

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
    const json = await client.execute(query);
    result = JSON.stringify(json, null, 2);
  }
</script>

<div>
  <EditorArea
    code={ query }
    bind:editor={ editor }
    on:activity={ cursorMoved }
    on:change={ onQueryChanged }
  />
  <button class='pure-button pure-button-primary'
    on:click={handleClick}>Submit</button>
</div>
<div>
  <pre>{result}</pre>
</div>
