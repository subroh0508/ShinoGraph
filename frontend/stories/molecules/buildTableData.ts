import { getDatumItem } from '$components/atoms/table';
import type { TableRowItem } from '$types/table';
import table from '../json/data-list-table.json';

export function buildRandomNumbers(count: number): TableRowItem[][] {
  return buildTableData(
    [{ item: 'RandomNumber', header: true }],
    new Array(count).fill(null)
      .map(() => ([{ item: { type: 'literal', value: calculateRandomNumber() }, header: false }])),
  );
}

export function buildRowsFromJson(header: string): TableRowItem[][] {
  const headers = table.headers;
  const data = table.data;

  return buildTableData(
    headers[header].map(item => ({ item, header: true })),
    data[header].map(datum =>
      headers[header].map(key => ({ item: getDatumItem(key, datum), header: false })),
    ),
  );
}

const calculateRandomNumber: () => string = () => new Array(10).fill(null)
  .map(() => Math.floor(Math.random() * 16).toString(16))
  .join('');

function buildTableData(header: TableRowItem[], data: TableRowItem[][]): TableRowItem[][] {
  if (!header.length) {
    return [];
  }

  const dataRows = data.map((datum, i) => (
    [{ item: (i + 1).toString(), header: false }, ...datum]
  ));

  return [[{ item: '#', header: true }, ...header], ...dataRows];
}
