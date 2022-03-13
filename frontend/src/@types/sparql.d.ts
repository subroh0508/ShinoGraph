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
  value: IRI | string;
  lang?: string;
  datatype?: DataType;
}

export interface IRI {
  href: string;
  label: RDF;
}

export interface DataType {
  href: string;
  label: string;
}
