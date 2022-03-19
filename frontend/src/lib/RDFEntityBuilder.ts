// @ts-ignore
import alias from './alias.yml';
import type { RDF, Properties, QuerySolution } from "$types/sparql";
import type {
  RDFElementKey,
  RDFEntity,
  Subject,
  Property,
  Predicate,
  RDFObject,
} from '$types/entity';
import { hasDataType, hasLang } from '$components/atoms/text';

type Key = RDFElementKey | string;
type NullableSolution = QuerySolution | null;
type NullableRDF = RDF | null;

export class RDFEntityBuilder {
  private readonly subjectKey: Key;
  private readonly predicateKey: Key;
  private readonly objectKey: Key;
  private readonly properties: Properties

  constructor(
    subjectKey: Key,
    predicateKey: Key,
    objectKey: Key,
    properties: Properties,
  ) {
    this.subjectKey = subjectKey;
    this.predicateKey = predicateKey;
    this.objectKey = objectKey;
    this.properties = properties;
  }

  build(data: QuerySolution[]): RDFEntity {
    return {
      subject: this.buildSubject(data),
      properties: this.buildProperties(data),
    }
  }

  private buildSubject(data: QuerySolution[]): Subject {
    const labelKey = getPrimaryKey(this.subjectKey);
    const descriptionKey = getSecondaryKey(this.subjectKey);

    const labelData: QuerySolution = data.find(e => e.hasOwnProperty(labelKey));
    const descriptionData: NullableSolution = descriptionKey && data.find(e => e.hasOwnProperty(descriptionKey));

    return {
      label: label(labelData[labelKey]) || '',
      description: descriptionData && label(descriptionData[descriptionKey]),
    }
  }

  private buildProperties(data: QuerySolution[]): Property[] {
    const predicateKey = getPrimaryKey(this.predicateKey);

    const predicatesMap = data.reduce((acc: { [key: string]: Predicate }, datum) => {
      const predicateId = href(getRDFOrNull(predicateKey, datum));
      if (!predicateId) {
        return acc;
      }

      return { ...acc, [predicateId]: this.buildPredicate(predicateId) };
    }, {});
    const objectMap = data.reduce((acc: { [key: string]: RDFObject[] }, datum) => {
      const predicateId = href(getRDFOrNull(predicateKey, datum));
      if (!predicateId) {
        return acc;
      }

      return {
        ...acc,
        [predicateId]: [...(acc[predicateId] || []), this.buildRDFObject(datum)].sort(compareItem),
      };
    }, {})

    return Object.keys(predicatesMap)
      .map(id => ({ predicate: predicatesMap[id], objects: objectMap[id] }));
  }

  private buildPredicate(href: string): Predicate {
    const label = this.properties[href]?.ja;

    return { label: !label ? href : label, value: { href, label: replaceByAlias(href) } };
  }

  private buildRDFObject(data: QuerySolution): RDFObject {
    const primaryKey = getPrimaryKey(this.objectKey);
    const primary: NullableRDF = getRDFOrNull(primaryKey, data);

    if (primary === null || primary?.type === 'literal') {
      return { ...(primary || {}), type: 'literal', value: label(primary) || '' };
    }

    const labelKey = getSecondaryKey(this.objectKey);
    const labelData: NullableRDF = labelKey && getRDFOrNull(labelKey, data);
    if (labelData === null || labelData.type !== 'literal') {
      return primary;
    }

    return { ...primary, value: { href: href(primary), label: labelData } };
  }
}

function getPrimaryKey(key: Key): string {
  return typeof key === 'string' ? key : key.primary;
}

function getSecondaryKey(key: Key): string | null {
  return typeof key === 'string' ? null : key.secondary;
}

function getRDFOrNull(key: string, datum: QuerySolution): NullableRDF {
  return datum[key] || null;
}

function href(value: NullableRDF): string | null {
  return typeof value?.value === 'string' ? value?.value : value?.value?.href;
}

function label(value: NullableRDF): string | null {
  return typeof value?.value === 'string' ? value?.value : label(value?.value?.label);
}

function replaceByAlias(href: string): string {
  const aliasKey = Object.keys(alias).find(e => href.includes(e));

  if (!aliasKey) {
    return href;
  }

  return href.replace(aliasKey, `${alias[aliasKey]}:`);
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
