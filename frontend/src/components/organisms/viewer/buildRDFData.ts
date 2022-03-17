import { isUri, isLiteral, isBlankNode, hasLang, hasDataType, label, href } from '$components/atoms/text';
import { getRDFOrNull } from '$components/molecules/table';
import type { QuerySolution, Properties, RDF } from '$types/sparql';
import type { TableRowItem } from '$types/table';

type NullableRDF = RDF | null;

export interface RDFElementKey {
  primary: string;
  secondary: string;
}

export function buildRDFData(
  headerKey: string,
  valueKey: RDFElementKey,
  data: QuerySolution[],
  properties: Properties,
): TableRowItem[][] {
  const headerMap = data.reduce((acc: { [key: string]: NullableRDF }, datum) => {
    const headerText = href(getRDFOrNull(headerKey, datum));
    if (!headerText) {
      return acc;
    }

    return { ...acc, [headerText]: buildHeaderElement(headerKey, properties, datum) };
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
        buildRDFElement(valueKey, datum),
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

function buildHeaderElement(headerKey: string, properties: Properties, datum: QuerySolution): NullableRDF {
  const header: NullableRDF = getRDFOrNull(headerKey, datum);

  if (!isUri(header)) {
    return header;
  }

  const propertyLabel = properties[href(header)];
  if (!propertyLabel) {
    return header;
  }

  return { ...header, value: { href: href(header), label: { type: 'literal', value: propertyLabel.ja } } };
}

function buildRDFElement(valueKey: RDFElementKey, datum: QuerySolution): NullableRDF {
  const primary: NullableRDF = getRDFOrNull(valueKey.primary, datum);

  if (!isUri(primary) && !isBlankNode(primary)) {
    return primary;
  }

  const secondary: NullableRDF = getRDFOrNull(valueKey.secondary, datum);
  if (!isLiteral(secondary)) {
    return primary;
  }

  return { ...primary, value: { href: href(primary), label: secondary } };
}

function compareItem(
  a: NullableRDF,
  b: NullableRDF,
  aHref: string | null = null,
  bHref: string | null = null,
): number {
  if (aHref !== null && bHref !== null) {
    if (aHref > bHref) {
      return 1;
    } else if(aHref < bHref) {
      return -1;
    }
  }

  const [aValue, bValue] = [a?.value, b?.value];

  if (aValue !== null && bValue !== null && typeof aValue !== 'string' && typeof bValue !== 'string') {
    return compareItem(aValue.label, bValue.label, aValue.href, bValue.href);
  }

  if (hasLang(a) && !hasLang(b) || hasDataType(a) && !hasDataType(b)) {
    return 1;
  } else if (hasLang(b) && !hasLang(a) || hasDataType(b) && !hasDataType(a)) {
    return -1;
  }

  const [aStr, bStr] = [label(a) || '', label(b) || ''];
  if (aStr > bStr) {
    return 1;
  } else if (aStr < bStr) {
    return -1;
  } else {
    return 0;
  }
}
