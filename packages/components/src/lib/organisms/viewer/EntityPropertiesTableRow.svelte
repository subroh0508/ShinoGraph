<script lang='ts'>
  import { TableHeader, TableData } from '$lib/molecules/table';
  import type { Property, RDFObject } from 'shinograph';

  export let property: Property;

  function label(object: RDFObject): string {
    return typeof object.value === 'string' ? object.value : label(object.value.label);
  }

  function href(object: RDFObject): string | null {
    if (object.type !== 'uri') {
      return null;
    }

    return typeof object.value === 'string' ? object.value : object.value.href;
  }

  function meta(object: RDFObject): string | null {
    if (typeof object.value !== 'string') {
      return meta(object.value.label);
    }

    if (object.hasOwnProperty('lang')) {
      return object.lang;
    }

    if (object.hasOwnProperty('datatype')) {
      return object.datatype.label;
    }

    return null;
  }
</script>

{#each property.objects as object, i}
  <tr>
    {#if i === 0}
      <TableHeader
        label={ property.predicate.label }
        href={ property.predicate.value.href }
        meta={ property.predicate.value.label }
        rowspan={ property.objects.length }
      />
    {/if}
    <TableData
      label={ label(object) }
      href={ href(object) }
      meta={ meta(object) }
    />
  </tr>
{/each}
