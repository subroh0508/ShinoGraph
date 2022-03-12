export interface QuerySolution {
  [key: string]: RDF;
}

export interface RDF {
  type: 'uri' | 'bnode' | 'literal';
  value: IRI | string;
  lang?: string;
  datatype?: DataType;
}

export interface IRI {
  href: string;
  label: string;
}

export interface DataType {
  href: string;
  label: string;
}
