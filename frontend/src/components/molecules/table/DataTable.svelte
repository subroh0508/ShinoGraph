<script context='module' lang='ts'>
  import { getItemValue, getDatumValue } from '$components/atoms/table';
  import type { TableDatum, TableRowItem, Item } from '$types/table';

  const buildRow = (
    headerKey: string,
    valueKey: string,
    data: TableDatum[],
  ): TableRowItem[][] => {
    const tHeader = data.map(datum => datum[headerKey])
      .reduce((acc, item) => {
        acc[getItemValue(item)] = (acc[getItemValue(item)] || 0) + 1;
        return acc
      }, {});

    return Object.keys(tHeader)
      .reduce((acc, headerText) => {
        const header: Item = data.find(datum => getDatumValue(headerKey, datum) === headerText)[headerKey];
        const values: TableDatum[] = data.filter(datum => getDatumValue(headerKey, datum) === headerText);

        return [
          ...acc,
          ...values.map((value, i) => (
            i === 0 ? [
              { item: header, header: true, rowspan: tHeader[getItemValue(header)] },
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
