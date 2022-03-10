<script lang='ts'>
  import { text, isUri, hasMeta, meta } from './helper';
  import type { Item } from '$types/table';

  export let datum: Item;
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
    {#if hasMeta(datum)}
      <span class='meta'>{ `(${meta(datum)})` }</span>
    {/if}
  {/if}
</td>

<style lang='scss'>
  .meta {

  }
</style>
