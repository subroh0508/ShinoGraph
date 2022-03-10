export interface QuerySolution {
  [key: string]: RDF;
}

export interface RDF {
  type: 'uri' | 'bnode' | 'literal';
  value: string;
  lang?: string;
  datatype?: DataType;
}

export interface DataType {
  href: string;
  label: string;
}
