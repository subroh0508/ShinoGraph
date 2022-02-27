<script lang='ts'>
  import Icon from 'svelte-awesome';
  import { faPlay } from '@fortawesome/free-solid-svg-icons';
  import { Button } from '$components/atoms/button';

  export let onExecuteQuery: () => void = void {};
</script>

<div class='row editor-footer'>
  <Button
    label='Execute'
    onClick={ onExecuteQuery }
  >
    <Icon data={ faPlay }/>
  </Button>
</div>

<style lang='scss'>
  .editor-footer {
    padding: 16px;
    background-color: var(--pure-white);
  }
</style>
