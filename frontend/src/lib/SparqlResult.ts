import type { QuerySolution, RDF } from '$types/sparql';

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

const XSD_URI = 'http://www.w3.org/2001/XMLSchema#';

export default class SparqlResult {
  private readonly ok: boolean;
  private readonly statusNumber: number;
  private readonly statusText: string;
  private readonly responseBody: SparqlResponseBody | null;
  private readonly responseErrorBody: string | null;

  constructor(
    ok: boolean,
    statusNumber: number,
    statusText: string,
    body: SparqlResponseBody | null,
    error: string | null,
  ) {
    this.ok = ok;
    this.statusNumber = statusNumber;
    this.statusText = statusText;
    this.responseBody = body;
    this.responseErrorBody = error;
  }

  static async build(response: Response): Promise<SparqlResult> {
    const ok = response.ok;
    if (ok) {
      const body: SparqlResponseBody = await response.json();

      return new SparqlResult(
        ok,
        response.status,
        response.statusText,
        body,
        null,
      );
    }

    const errorBody: string = await response.text();

    return new SparqlResult(
      ok,
      response.status,
      response.statusText,
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
        (acc: QuerySolution, key: string) => ({ ...acc, [key]: SparqlResult.toRDF(binding[key]) }),
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

  private static toRDF(object: SparqlJsonObject): RDF {
    const rdf = { type: object.type, value: object.value };

    if (object.hasOwnProperty('xml:lang')) {
      return { ...rdf, lang: object['xml:lang'] };
    }

    if (object.hasOwnProperty('datatype')) {
      return { ...rdf, datatype: object.datatype };
    }

    return rdf;
  }
}
