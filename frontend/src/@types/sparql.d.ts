export interface SparqlResponseBody {
  head: {
    vars?: string[];
    link?: string[];
  } | {
    [key: string]: never;
  };
  boolean?: boolean;
  results?: {
    bindings: Binding[];
  };
}

export interface Binding {
  [key: string]: SparqlJsonObject;
}

export interface SparqlJsonObject {
  type: 'uri' | 'literal' | 'bnode';
  value: string;
  datatype?: string;
  "xml:lang"?: string;
}
