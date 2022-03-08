import type { Item } from '$types/table';

export function isUri(item: Item | string | null): boolean {
  if (typeof item === 'string') {
    return false;
  }

  return item?.type === 'uri';
}

export function text(item: Item | string | null): string {
  if (typeof item === 'string') {
    return item;
  }

  return item?.value || '';
}

export function meta(item: Item | string | null): string | null {
  if (typeof item === 'string') {
    return null;
  }

  return item?.lang || item?.datatype;
}
