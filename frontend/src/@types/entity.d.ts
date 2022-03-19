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

export interface RDFMeta {
  href: string;
  label: string;
}