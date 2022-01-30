<script context='module' lang='ts'>
  export const prerender = false;
</script>

<script lang='ts'>
  import Editor from '$lib/Editor.svelte';
  import { onMount } from 'svelte';

  let editor;
  let cursor = false;
  onMount(() => console.log("Editor: ", editor));

  function cursorMoved(event) {
    cursor = true;
    console.log('cursor activity');
    // console.log(event.detail)

  }

  function changed(event) {
    console.log('changed');
    // console.log(event.detail)
  }
</script>

<Editor on:activity={ cursorMoved } on:change={ changed } bind:editor={ editor } class="editor"/>
<p>
  Cursor Activity: {cursor}
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
