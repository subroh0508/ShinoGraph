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

<div class='container'>
  <div class='row'>
    <CodeMirrorTextArea
      code={ query }
      bind:editor={ editor }
      on:activity={ cursorMoved }
      on:change={ onQueryChanged }
    />
  </div>
  <div class='row editor-footer'>
    <Button
      label='Execute'
      onClick={ handleClick }
    >
      <Icon data={ faPlay }/>
    </Button>
  </div>
  {#if !!headers.length || !!data.length}
    <div class='row result-table'>
      <DataTable headers={ headers } data={ data }/>
    </div>
  {/if}
</div>

<style lang='scss'>
  .container {
    .row {
      border-top: 1px solid var(--dark-gray);
      border-left: 1px solid var(--dark-gray);
      border-right: 1px solid var(--dark-gray);

      &:last-child {
        border-bottom: 1px solid var(--dark-gray);
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }

    :global(table) {
      border-top: none;
      border-bottom: none;
      border-right: none;
    }

    :global(table),
    :global(th):first-child,
    :global(td):first-child {
      border-left: none;
    }
  }
  .editor-footer {
    padding: 16px;
    background-color: var(--pure-white);
  }
  .result-table {
    overflow-x: auto;
  }
</style>
