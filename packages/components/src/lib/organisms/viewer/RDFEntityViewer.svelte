<script lang='ts'>
  import EntityPropertiesTable from './EntityPropertiesTable.svelte';
  import type { RDFEntity } from 'shinograph';

  export let entity: RDFEntity | null = null;
</script>

{#if !!entity}
  <EntityPropertiesTable properties={ entity.properties }/>
{/if}
