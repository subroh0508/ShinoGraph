import { getDatumItem } from '$components/atoms/table';
import type { QuerySolution } from '$types/sparql';
import type { TableRowItem } from '$types/table';

export default function buildPaginatableData(header: string[], data: QuerySolution[]): TableRowItem[][] {
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