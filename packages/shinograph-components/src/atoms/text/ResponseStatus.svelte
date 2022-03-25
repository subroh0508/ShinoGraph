<script lang='ts'>
  import Icon from 'svelte-awesome';
  import { faCircleCheck, faTriangleExclamation, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
  import type { IconDefinition } from '@fortawesome/free-regular-svg-icons';

  export let statusCode: number = 0;
  export let message: string[] = [];

  let icon: IconDefinition | null;

  $: ok = statusCode / 100 === 2;
  $: redirect = statusCode / 100 === 3;
  $: error = statusCode / 100 === 4 || statusCode / 100 === 5;
  $: if (ok) {
    icon = faCircleCheck;
  } else if (redirect) {
    icon = faTriangleExclamation;
  } else if (error) {
    icon = faCircleExclamation;
  } else {
    icon = null;
  }
</script>

<div
  class='response-status'
  class:ok={ ok }
  class:redirect={ redirect }
  class:error={ error }
>
  {#if !!icon}
    <Icon data={ icon }/>
  {/if}
  <div class='response-description'>
    <div class='response-status-code'>{ statusCode }</div>
    {#each message as text}
      { text || '' }<br/>
    {/each}
  </div>
</div>

<style lang='scss'>
  $ok: #edf7ed;
  $ok-text: #1e4620;
  $ok-icon: #4caf50;
  $redirect: #fff4e5;
  $redirect-text: #663c00;
  $redirect-icon: #ff9800;
  $error: #fdeded;
  $error-text: #5f2120;
  $error-icon: #ef5350;

  .response-status {
    display: flex;
    padding: 6px 16px;
    border-radius: 2px;

    :global(svg) {
      padding: 8px 0;
      margin-right: 12px;
    }
  }

  .response-description {
    padding: 8px 0;
  }

  .response-status-code {
    font-weight: bold;
    margin-bottom: 0.35em;
  }

  .ok {
    background-color: $ok;
    color: $ok-text;

    :global(svg) {
      color: $ok-icon;
    }
  }

  .redirect {
    background-color: $redirect;
    color: $redirect-text;

    :global(svg) {
      color: $redirect-icon;
    }
  }

  .error {
    background-color: $error;
    color: $error-text;

    :global(svg) {
      color: $error-icon;
    }
  }
</style>
