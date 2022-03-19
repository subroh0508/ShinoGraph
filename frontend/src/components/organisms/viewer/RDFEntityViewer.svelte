<script lang='ts'>
  import EntityPropertiesTable from './EntityPropertiesTable.svelte';
  import type { RDFEntity } from '$types/entity';

  export let entity: RDFEntity | null = null;
</script>

<EntityPropertiesTable properties={ entity.properties }/>
