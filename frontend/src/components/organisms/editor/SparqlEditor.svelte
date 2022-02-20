<script lang='ts'>
  import { client } from '$lib/SparqlClient';

  import Icon from 'svelte-awesome';
  import { faPlay } from '@fortawesome/free-solid-svg-icons';
  import { Button } from '$components/atoms/button';
  import { CodeMirrorTextArea } from '$components/molecules/textarea';
  import { DataTable } from '$components/molecules/datatable';
  import type { EditorFromTextArea } from 'codemirror';
  import type { TableDatum } from '$types/table';

  export let query: string;
  
  let result = {};
  let editor: EditorFromTextArea = null;
  let cursor = false;

  let headers: string[] = [];
  let data: TableDatum[] = [];

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
    headers = [];
    data = [];
    const result = await client.execute(query);
    headers = result.head.vars;
    data = result.results.bindings;
  }
</script>

<div>
  <CodeMirrorTextArea
    code={ query }
    bind:editor={ editor }
    on:activity={ cursorMoved }
    on:change={ onQueryChanged }/>
  <Button
    label='Submit'
    onClick={ handleClick }
  >
    <Icon data={ faPlay }/>
  </Button>
  {#if !!headers.length || !!data.length}
    <div class='result-table'>
      <DataTable headers={ headers } data={ data }/>
    </div>
  {/if}
</div>

<style lang='scss'>
  .result-table {
    overflow-x: auto;
  }
</style>
