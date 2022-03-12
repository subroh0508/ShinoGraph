<script lang='ts' context='module'>
  import { getDatumItem } from '$components/atoms/table';
  import type { TableDatum, TableRowItem } from '$types/table';

  function buildRows(header: string[], data: TableDatum[]): TableRowItem[][] {
    if (!header.length) {
      return [];
    }

    const headerRow = [{ item: '#', header: true }, ...header.map(h => ({ item: h, header: true }))];
    const dataRows = data.map((datum, i) => (
      [
        { item: (i + 1).toString(), header: false },
        ...header.map(header => ({ item: getDatumItem(header, datum), header: false })),
      ]
    ));

    return [headerRow, ...dataRows];
  }
</script>

<script lang='ts'>
  import { PaginatableTable } from '$components/molecules/table';
  import SparqlResult from '$lib/SparqlResult';

  export let result: SparqlResult | null = null;

  $: rows = buildRows(result?.vars || [], result?.bindings || []);
</script>

{#if result && result.isOk}
  <div class='row result-table'>
    <PaginatableTable
      striped
      rows={ rows }
    />
  </div>
{/if}

<style lang='scss'>
  .result-table {
    overflow-x: auto;
  }
</style>
