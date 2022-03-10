<script lang='ts'>
  import { TableRow, getDatumItem } from '$components/atoms/table';
  import type { TableDatum } from '$types/table';

  export let header: string[] = [];
  export let data: TableDatum[] = [];
  export let offset: number = 0;
  export let striped: boolean = false;

  $: headerRow = [
    { item: '#', header: true },
    ...header.map(h => ({ item: h, header: true })),
  ];
  $: dataRow = data.map((datum, i) =>
    [
      { item: (offset + i + 1).toString(), header: false },
      ...header.map(header => ({ item: getDatumItem(header, datum), header: false })),
    ]
  );
</script>

<table class='pure-table'
  class:pure-table-striped={ striped }
  class:pure-table-bordered={ !striped }>
  <thead>
    <TableRow row={ headerRow }/>
  </thead>
  <tbody>
    {#if !!dataRow.length}
      {#each dataRow as row}
        <TableRow row={ row }/>
      {/each}
    {/if}
  </tbody>
  <slot/>
</table>

<style lang='scss'>
  .pure-table {
    background-color: var(--pure-white);

    :global(.footer) {
      background-color: var(--normal-gray);
      border-top: 1px solid var(--dark-gray);

      :global(th) {
        font-weight: normal;
      }
    }
  }
</style>
