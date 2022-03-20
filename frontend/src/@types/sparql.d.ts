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
  datatype?: string;
}
