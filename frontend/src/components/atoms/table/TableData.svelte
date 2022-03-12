<script lang='ts'>
  import { isUri, label, href, hasLang, hasDataType, lang, datatype } from './helper';
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
    <a
      href={ href(datum) }
      target='_blank'
      rel='noopener noreferrer'
    >
      { label(datum) }
    </a>
  {:else}
    { label(datum) }
    {#if hasLang(datum)}
      <span class='meta'>{ `(${lang(datum)})` }</span>
    {/if}
    {#if hasDataType(datum)}
      <span class='meta'>
        <a
          href={ datatype(datum).href }
          target='_blank'
          rel='noopener noreferrer'
        >
          { `(${datatype(datum).label})` }
        </a>
      </span>
    {/if}
  {/if}
</td>

<style lang='scss'>
  .meta {
    font-size: 0.75rem;
  }
</style>
