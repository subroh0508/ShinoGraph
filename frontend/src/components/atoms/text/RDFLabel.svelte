<script lang='ts'>
  import { label, hasLang, hasDataType, lang, datatype } from './helper';
  import type { Item } from '$types/table';

  export let item: Item;
</script>

{ label(item) }
{#if hasLang(item)}
  <span class='meta'>{ `(${lang(item)})` }</span>
{/if}
{#if hasDataType(item)}
  <span class='meta'>{ `(${datatype(item).label})` }</span>
{/if}

<style lang='scss'>
  .meta {
    font-size: 0.75rem;
  }
</style>
