import type { Item } from '$types/table';

export default function isUri(item: Item | string): boolean {
  if (typeof item === 'string') {
    return false;
  }

  return !!item && item.type === 'uri';
}
