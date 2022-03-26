export interface QuerySolution {
  [key: string]: RDF;
}

export interface Properties {
  [key: string]: PropertyLabel;
}

export interface PropertyLabel {
  default: string;
  ja: string;
}

export interface RDF {
  type: 'uri' | 'bnode' | 'literal';
  value: string;
  lang?: string;
  datatype?: RDFMeta;
}

export interface RDFMeta {
  href: string;
  label: string;
}

export type NullableSolution = QuerySolution | null;
