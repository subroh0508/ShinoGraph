<script lang='ts'>
  import { text, isUri } from './helper';
  import type { Item } from '$types/table';

  export let header: Item;
  export let rowspan: number;
  export let colspan: number;
</script>

<th
  rowspan={ rowspan }
  colspan={ colspan }
>
  {#if isUri(header)}
    <a href={ text(header) } target='_blank' rel='noopener noreferrer'>
      { text(header) }
    </a>
  {:else}
    { text(header) }
  {/if}
</th>
