<script lang='ts'>
  import { isUri, label, href } from './helper';
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
    <a href={ href(header) } target='_blank' rel='noopener noreferrer'>
      { label(header) }
    </a>
  {:else}
    { label(header) }
  {/if}
</th>
