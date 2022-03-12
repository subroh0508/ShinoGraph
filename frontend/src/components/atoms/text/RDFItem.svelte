<script lang='ts' context='module'>
  import type { Item } from '$types/table';

  function value(item: Item): Item {
    if (item === null || typeof item === 'string') {
      return item;
    }

    const value = item.value;
    if (typeof value === 'string') {
      return item;
    }

    return value.label;
  }
</script>

<script lang='ts'>
  import { isUri, isBlankNode, href } from './helper';
  import RDFLabel from './RDFLabel.svelte';
  import type { Item } from '$types/table';

  export let item: Item;
</script>

{#if isUri(item)}
  <a
    href={ href(item) }
    target='_blank'
    rel='noopener noreferrer'
  >
    <RDFLabel item={ value(item) }/>
  </a>
{:else if isBlankNode(item)}
  <RDFLabel item={ value(item) }/>
{:else}
  <RDFLabel item={ item }/>
{/if}
