<script lang='ts'>
  import text from './text';
  import isUri from './isUri';
  import type { Item } from '$types/table';

  export let header: Item | string
</script>

<th>
  {#if isUri(header)}
    <a href={ text(header) } target='_blank' rel='noopener noreferrer'>
      { text(header) }
    </a>
  {:else}
    { text(header) }
  {/if}
</th>
