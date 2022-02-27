<script lang='ts'>
  import { CodeMirrorTextArea } from '$components/molecules/textarea';
  import type { EditorFromTextArea } from 'codemirror';

  export let code: string = '';

  let editor: EditorFromTextArea = null;
  let cursor: boolean = false;

  function cursorMoved(event) {
    cursor = true;
    console.log('cursor activity');
    // console.log(event.detail)
  }

  function onCodeChanged(event: CustomEvent) {
    code = event.detail.value;

    console.log('changed: ', code);
  }
</script>

<div class='row'>
  <CodeMirrorTextArea
    code={ code }
    bind:editor={ editor }
    on:activity={ cursorMoved }
    on:change={ onCodeChanged }
  />
</div>

