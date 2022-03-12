import type { DataType, QuerySolution, RDF } from '$types/sparql';
import type { Item } from '$types/table';

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

export function hasLang(item: Item): boolean {
  if (item === null || typeof item === 'string') {
    return false;
  }

  return item.hasOwnProperty('lang');
}

export function hasDataType(item: Item): boolean {
  if (item === null || typeof item === 'string') {
    return false;
  }

  return item.hasOwnProperty('datatype');
}

export function lang(item: Item): string | null {
  if (typeof item === 'string') {
    return null;
  }

  return item?.lang;
}

export function datatype(item: Item): DataType | null {
  if (typeof item === 'string') {
    return null;
  }

  return item?.datatype;
}

export function getRDFOrNull(key: string, datum: QuerySolution): RDF | null {
  return datum[key] || null;
}
