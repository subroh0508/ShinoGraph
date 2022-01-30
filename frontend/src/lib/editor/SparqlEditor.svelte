<script lang='ts'>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import type { Editor, EditorConfiguration } from 'codemirror';

  const dispatch = createEventDispatcher();

  export let editor = null;
  export let readonly = false;
  export let code = '';

  let w: number;
  let h: number;

  let CodeMirror;
  let refs: { [key: string]: HTMLTextAreaElement } = {};

  const options: EditorConfiguration = {
    mode: 'sparql',
    lineWrapping: true,
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    extraKeys: {
      Tab: (cm: Editor) => cm.execCommand('indentMore'),
    },
  };

  onMount(async () => {
    if (!CodeMirror) {
      CodeMirror = (await import('./codemirror.js')).default;
    }

    if (editor) {
      refs.editor.innerHTML = '';
    }

    await createEditor();
  });

  $: if (editor && w && h) {
    editor.refresh();
  }

  async function createEditor() {
    editor = CodeMirror.fromTextArea(refs.editor, options);
    editor.on("cursorActivity", (event) => dispatch('activity', event));
    editor.on("change", event => dispatch('change', { value: event.getValue() }));

    editor.refresh();
  }
</script>

<div class='codemirror-container' bind:offsetWidth={ w } bind:offsetHeight={ h }>
  <textarea
    bind:this={ refs.editor }
    readonly
    value={code}
  ></textarea>

  {#if !CodeMirror}
    <pre style="position: absolute; inset-inline-start: 0; inset-block-start: 0">{code}</pre>

    <div style="position: absolute; inline-size: 100%; inset-block-end: 0">
      <div>loading editor...</div>
    </div>
  {/if}
</div>
