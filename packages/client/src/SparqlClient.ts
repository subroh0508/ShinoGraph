import { SparqlQueryExecutionResult } from './SparqlQueryExecutionResult';
import type { SparqlResult } from 'shinograph';

export class SparqlClient {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async execute(
    query: string,
    option: RequestInit = {
      method: 'GET',
      headers: { 'Accept': 'application/sparql-results+json' },
    },
    alias: { [key: string]: string } = {},
  ): Promise<SparqlResult> {
    const res = await fetch(
      `${this.baseUrl}/spql/query?query=${encodeURIComponent(query)}`,
      option,
    );

    return await SparqlQueryExecutionResult.build(res, alias);
  }
}
