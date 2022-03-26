<script lang='ts'>
  import EntityPropertiesTableRow from './EntityPropertiesTableRow.svelte';
  import type { Property } from '$types/entity';

  export let properties: Property[] = [];
</script>

<table class='pure-table pure-table-bordered data-table'>
  {#each properties as property}
    <EntityPropertiesTableRow property={ property }/>
  {/each}
</table>

<style lang='scss'>
  .data-table {
    :global(th) {
      background-color: var(--normal-gray);
      border-bottom: 1px solid var(--dark-gray);
    }
  }
</style>
