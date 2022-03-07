<script context='module' lang='ts'>
  import type { TableDatum, TableRowItem } from '$types/table';

  const buildRow = (
    headerKey: string,
    valueKey: string,
    data: TableDatum[],
  ): TableRowItem[][] => {
    const tHeader = data.map(datum => datum[headerKey])
      .reduce((acc, datum) => {
        acc[datum.value] = (acc[datum.value] || 0) + 1;
        return acc
      }, {});

    return Object.keys(tHeader)
      .reduce((acc, headerText) => {
        const header = data.find(datum => datum[headerKey].value === headerText)[headerKey];
        const values = data.filter(datum => datum[headerKey].value === headerText);

        return [
          ...acc,
          ...values.map((value, i) => (
            i === 0 ? [
              { item: header, header: true, rowspan: tHeader[header.value] },
              { item: value[valueKey], header: false },
            ] : [
              { item: value[valueKey], header: false },
            ]
          )),
        ];
      }, []);
  };
</script>

<script lang='ts'>
  import { TableRow } from '$components/atoms/table';
  import type { TableDatum } from '$types/table';

  export let headerKey: string;
  export let valueKey: string;
  export let data: TableDatum[] = [];

  $: row = buildRow(headerKey, valueKey, data)
</script>

<table class='pure-table pure-table-bordered data-table'>
  {#if !!row.length}
    {#each row as r}
      <TableRow row={ r }/>
    {/each}
  {/if}
</table>

<style lang='scss'>
  .data-table {
    :global(th) {
      background-color: var(--normal-gray);
      border-bottom: 1px solid var(--dark-gray);
    }
  }
</style>
