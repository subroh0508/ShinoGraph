import type { SparqlResponseBody } from '$types/sparql';

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

  get body(): SparqlResponseBody {
    if (this.responseBody === null) {
      throw this.error;
    }

    return this.responseBody;
  }

  get error(): Error { return new Error(this.responseErrorBody || 'Something wrong'); }
}
