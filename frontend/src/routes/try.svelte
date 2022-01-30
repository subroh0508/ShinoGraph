<script context='module' lang='ts'>
  export const prerender = false;
</script>

<script lang='ts'>
  import SparqlEditor from '$lib/editor/SparqlEditor.svelte';
  import { onMount } from 'svelte';

  let editor;
  let cursor = false;
  onMount(() => console.log("Editor: ", editor));

  function cursorMoved(event) {
    cursor = true;
    console.log('cursor activity');
    // console.log(event.detail)

  }

  function onQueryChanged(event: CustomEvent) {
    const query = event.detail.value;

    console.log('changed: ', query);
  }
</script>

<SparqlEditor on:activity={ cursorMoved } on:change={ onQueryChanged } bind:editor={ editor }/>
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
