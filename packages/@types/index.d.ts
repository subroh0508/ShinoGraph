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

export interface SparqlResult {
  get isOk(): boolean;
  get status(): number;
  get message(): string[];
  get vars(): string[];
  get bindings(): QuerySolution[];
  get error(): Error
}

export interface RDFEntity {
  subject: Subject;
  properties: Property[];
}

export interface Subject {
  label: string;
  description: string | null;
}

export interface Property {
  predicate: Predicate;
  objects: RDFObject[];
}

export interface Predicate {
  label: string;
  value: RDFMeta;
}

export interface RDFObject {
  type: 'uri' | 'literal' | 'bnode';
  value: IRI | string;
  lang?: string;
  datatype?: RDFMeta;
}

export interface RDFElementKey {
  primary: string;
  secondary: string;
}

export interface IRI {
  href: string;
  label: RDFObject;
}
