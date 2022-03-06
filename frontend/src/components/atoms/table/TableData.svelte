<script lang='ts'>
  import text from './text';
  import isUri from './isUri';
  import type { Item } from '$types/table';

  export let datum: Item | string
</script>

<td>
  {#if isUri(datum)}
    <a href={ text(datum) } target='_blank' rel='noopener noreferrer'>
      { text(datum) }
    </a>
  {:else}
    { text(datum) }
  {/if}
</td>
