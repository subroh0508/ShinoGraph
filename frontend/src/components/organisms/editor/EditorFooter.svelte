<script lang='ts'>
  import Icon from 'svelte-awesome';
  import { faPlay } from '@fortawesome/free-solid-svg-icons';
  import { Button } from '$components/atoms/button';
  import { ResponseStatus } from '$components/atoms/text';

  export let onExecuteQuery: () => void = void {};
  export let statusCode: number | null = null;
  export let message: string[] = [];
</script>

<div class='row editor-footer'>
  <Button
    label='Execute'
    onClick={ onExecuteQuery }
  >
    <Icon data={ faPlay }/>
  </Button>

  {#if !!statusCode}
    <div class='status'>
      <ResponseStatus statusCode={ statusCode } message={ message }/>
    </div>
  {/if}
</div>

<style lang='scss'>
  .editor-footer {
    padding: 16px;
    background-color: var(--pure-white);
  }

  .status {
    padding-top: 16px;
  }
</style>
