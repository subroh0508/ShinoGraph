import { hasLang, hasDataType, getItemValue } from '$components/atoms/table/helper';
import { getDatumItem, getDatumValue } from '$components/atoms/table';
import type { QuerySolution } from '$types/sparql';
import type { Item, TableRowItem } from '$types/table';

export default function buildIRIData(headerKey: string, valueKey: string, data: QuerySolution[]): TableRowItem[][] {
  const headerMap = data.reduce((acc: { [key: string]: Item }, datum) => {
    const headerText = getDatumValue(headerKey, datum);
    if (!headerText) {
      return acc;
    }

    return { ...acc, [headerText]: getDatumItem(headerKey, datum) };
  }, {});
  const dataMap = data.reduce((acc: { [key: string]: Item[] }, datum) => {
    const headerText = getDatumValue(headerKey, datum);
    if (!headerText) {
      return acc;
    }

    return {
      ...acc,
      [headerText]: [
        ...(acc[headerText] || []),
        getDatumItem(valueKey, datum),
      ].sort(compareItem),
    };
  }, {});

  return Object.keys(headerMap)
    .reduce((acc, headerText) => {
      const header: Item = headerMap[headerText];
      const items: Item[] = dataMap[headerText];

      return [
        ...acc,
        ...items.map((item, i) => (
          i === 0 ? [
            { item: header, header: true, rowspan: items.length },
            { item, header: false },
          ] : [
            { item, header: false },
          ]
        )),
      ];
    }, []);
}

function compareItem(a: Item, b: Item): number {
  if (hasLang(a) && !hasLang(b) || hasDataType(a) && !hasDataType(b)) {
    return 1;
  } else if (hasLang(b) && !hasLang(a) || hasDataType(b) && !hasDataType(a)) {
    return -1;
  }

  const [aStr, bStr] = [getItemValue(a) || '', getItemValue(b) || ''];
  if (aStr.length > bStr.length) {
    return 1;
  } else if (aStr.length < bStr.length) {
    return -1;
  }

  if (aStr > bStr) {
    return -1;
  } else if (aStr < bStr) {
    return 1;
  } else {
    return 0;
  }
}
