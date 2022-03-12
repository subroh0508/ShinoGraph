import { hasLang, hasDataType, label, href } from '$components/atoms/table';
import { getRDFOrNull } from '$components/atoms/table';
import type { QuerySolution, RDF } from '$types/sparql';
import type { TableRowItem } from '$types/table';

type NullableRDF = RDF | null;

export default function buildRDFData(
  headerKey: string,
  valueKey: string,
  data: QuerySolution[],
): TableRowItem[][] {
  const headerMap = data.reduce((acc: { [key: string]: NullableRDF }, datum) => {
    const headerText = href(getRDFOrNull(headerKey, datum));
    if (!headerText) {
      return acc;
    }

    return { ...acc, [headerText]: getRDFOrNull(headerKey, datum) };
  }, {});
  const dataMap = data.reduce((acc: { [key: string]: NullableRDF[] }, datum) => {
    const headerText = href(getRDFOrNull(headerKey, datum));
    if (!headerText) {
      return acc;
    }

    return {
      ...acc,
      [headerText]: [
        ...(acc[headerText] || []),
        getRDFOrNull(valueKey, datum),
      ].sort(compareItem),
    };
  }, {});

  return Object.keys(headerMap)
    .reduce((acc, headerText) => {
      const header: NullableRDF = headerMap[headerText];
      const items: NullableRDF[] = dataMap[headerText];

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

function compareItem(a: NullableRDF, b: NullableRDF): number {
  if (hasLang(a) && !hasLang(b) || hasDataType(a) && !hasDataType(b)) {
    return 1;
  } else if (hasLang(b) && !hasLang(a) || hasDataType(b) && !hasDataType(a)) {
    return -1;
  }

  const [aStr, bStr] = [label(a) || '', label(b) || ''];
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
