<script lang='ts'>
  import { client } from '$lib/SparqlClient';

  import Icon from 'svelte-awesome';
  import { faPlay } from '@fortawesome/free-solid-svg-icons';
  import { Button } from '$components/atoms/button';
  import { CodeMirrorTextArea } from '$components/molecules/textarea';
  import { DataTable } from '$components/molecules/datatable';
  import type { EditorFromTextArea } from 'codemirror';

  export let query: string;
  
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
  <CodeMirrorTextArea
    code={ query }
    bind:editor={ editor }
    on:activity={ cursorMoved }
    on:change={ onQueryChanged }
  />
  <Button
    label='Submit'
    onClick={ handleClick }
  >
    <Icon data={ faPlay }/>
  </Button>
  <DataTable headers={ [] } data={ [] }/>
</div>
