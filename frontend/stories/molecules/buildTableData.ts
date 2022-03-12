import { getDatumItem } from '$components/atoms/table';
import { buildPaginatableData } from '$components/organisms/editor';
import { buildIRIData } from '$components/organisms/viewer';
import type { TableRowItem, TableDatum, Item } from '$types/table';
import dataListTable from '../json/data-list-table.json';
import dataTable from '../json/data-table.json';

export function buildRandomNumbers(count: number): TableRowItem[][] {
  return buildPaginatableData(
    ['RandomNumber'],
    new Array(count).fill(null)
      .map(() => ({ RandomNumber: { type: 'literal', value: calculateRandomNumber() } })),
  );
}

export function buildRowsFromJson(label: string): TableRowItem[][] {
  const headers = dataListTable.headers;
  const data = dataListTable.data;

  return buildPaginatableData(headers[label], data[label]);
}

export function buildDataFromJson(label: string, headerKey: string, valueKey: string): TableRowItem[][] {
  return buildIRIData(headerKey, valueKey, dataTable[label]);
}

const calculateRandomNumber: () => string = () => new Array(10).fill(null)
  .map(() => Math.floor(Math.random() * 16).toString(16))
  .join('');
