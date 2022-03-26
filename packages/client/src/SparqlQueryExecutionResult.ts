import type { QuerySolution, RDF, SparqlResult } from 'shinograph';

interface SparqlResponseBody {
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

interface Binding {
  [key: string]: SparqlJsonObject;
}

interface SparqlJsonObject {
  type: 'uri' | 'literal' | 'bnode';
  value: string;
  datatype?: string;
  "xml:lang"?: string;
}

export class SparqlQueryExecutionResult implements SparqlResult {
  private readonly ok: boolean;
  private readonly statusNumber: number;
  private readonly statusText: string;
  private readonly responseBody: SparqlResponseBody | null;
  private readonly responseErrorBody: string | null;
  private readonly alias: { [key: string]: string }

  constructor(
    ok: boolean,
    statusNumber: number,
    statusText: string,
    alias: { [key: string]: string },
    body: SparqlResponseBody | null,
    error: string | null,
  ) {
    this.ok = ok;
    this.statusNumber = statusNumber;
    this.statusText = statusText;
    this.alias = alias;
    this.responseBody = body;
    this.responseErrorBody = error;
  }

  static async build(response: Response, alias: { [key: string]: string }): Promise<SparqlResult> {
    const ok = response.ok;
    if (ok) {
      const body: SparqlResponseBody = await response.json();

      return new SparqlQueryExecutionResult(
        ok,
        response.status,
        response.statusText,
        alias,
        body,
        null,
      );
    }

    const errorBody: string = await response.text();

    return new SparqlQueryExecutionResult(
      ok,
      response.status,
      response.statusText,
      {},
      null,
      errorBody,
    );
  }

  get isOk(): boolean { return this.ok; }
  get status(): number { return this.statusNumber; }
  get message(): string[] {
    if (this.isOk) {
      return [this.statusText];
    }

    return [this.statusText, this.responseErrorBody];
  }

  get vars(): string[] {
    this.validateBody();

    return this.responseBody.head.vars || [];
  }
  get bindings(): QuerySolution[] {
    this.validateBody();

    return this.responseBody.results.bindings.map(binding => {
      return Object.keys(binding).reduce(
        (acc: QuerySolution, key: string) => ({ ...acc, [key]: this.toRDF(binding[key]) }),
        {},
      );
    });
  }

  get error(): Error { return new Error(this.responseErrorBody || 'Something wrong'); }

  private validateBody() {
    if (this.responseBody === null) {
      throw this.error;
    }
  }

  private toRDF(object: SparqlJsonObject): RDF {
    const rdf = { type: object.type, value: object.value };

    if (object.hasOwnProperty('xml:lang')) {
      return { ...rdf, lang: object['xml:lang'] };
    }

    if (object.hasOwnProperty('datatype')) {
      const aliasKey = Object.keys(this.alias).find(key => object.datatype.includes(key));
      const label = object.datatype.replace(aliasKey, `${this.alias[aliasKey]}:`);

      return { ...rdf, datatype: { href: object.datatype, label } };
    }

    return rdf;
  }
}
