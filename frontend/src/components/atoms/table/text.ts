import type { Item } from '$types/table';

export default function text(item: Item | string): string {
  if (typeof item === 'string') {
    return item;
  }

  return !!item ? (item.value || '') : '';
}
