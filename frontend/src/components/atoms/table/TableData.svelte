<script lang='ts'>
  import { text, isUri } from './helper';
  import type { Item } from '$types/table';

  export let datum: Item | string;
  export let rowspan: number;
  export let colspan: number;
</script>

<td
  rowspan={ rowspan }
  colspan={ colspan }
>
  {#if isUri(datum)}
    <a href={ text(datum) } target='_blank' rel='noopener noreferrer'>
      { text(datum) }
    </a>
  {:else}
    { text(datum) }
  {/if}
</td>
