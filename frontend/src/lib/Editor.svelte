<script lang='ts'>
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import type { Editor } from 'codemirror';

  import 'codemirror/lib/codemirror.css';

  const dispatch = createEventDispatcher();

  let classes = '';

  export let editor = null;
  export { classes as class }

  let element;

  const options = {
      mode: 'sparql',
      lineWrapping: true,
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      extraKeys: {
          Tab: (cm: Editor) => cm.execCommand('indentMore'),
      },
  };

  onMount(() => { console.log('onMount'); createEditor(options); });

  //$: if(element) { console.log('$: '); createEditor(options); }

  async function createEditor(options) {
    if (!window) {
      return;
    }

    await import('codemirror/mode/sparql/sparql');
    const module = await import('codemirror');

    const CodeMirror = module.default;
    if (editor) element.innerHTML = '';

    editor = CodeMirror(element, options);
    editor.on("cursorActivity", (event) => dispatch('activity', event));
    editor.on("change", (event) => dispatch('change', event));
    // More events could be set up here
  }
</script>

<div bind:this={element}></div>
