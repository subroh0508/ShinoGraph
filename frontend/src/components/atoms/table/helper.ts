import type { RDF } from '$types/sparql';
import type { TableDatum } from '$types/table';

type Item = RDF | string | null;

export function isUri(item: Item): boolean {
  if (typeof item === 'string') {
    return false;
  }

  return item?.type === 'uri';
}

export function text(item: Item): string {
  if (typeof item === 'string') {
    return item;
  }

  return item?.value || '';
}

export function hasMeta(item: Item): boolean {
  if (item === null || typeof item === 'string') {
    return false;
  }

  return item.hasOwnProperty('lang') || item.hasOwnProperty('datatype');
}

export function meta(item: Item): string | null {
  if (typeof item === 'string') {
    return null;
  }

  return item?.lang || item?.datatype;
}

export function getItemValue(item: Item): string | null {
  if (typeof item === 'string') {
    return item;
  }

  return item?.value;
}

export function getDatumItem(key: string, datum: TableDatum): Item {
  return datum[key] || null;
}

export function getDatumValue(key: string, datum: TableDatum): string | null {
  const v = getDatumItem(key, datum);
  if (typeof v === 'string') {
    return v;
  }

  return v?.value;
}
